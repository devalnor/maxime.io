"""Generate runtime point data locally. Requires Pillow: python3 -m pip install Pillow.

Source images stay outside the published assets and are not needed by CI builds.
"""
from pathlib import Path
import math
import struct
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'source-assets/portrait/portrait.png'
OUTPUT = ROOT / 'public/static/portrait/assets'
seed = 7349


def random():
    global seed
    seed = (seed * 1664525 + 1013904223) & 0xffffffff
    return seed / 4294967296


pixels = Image.open(SOURCE).convert('RGB').resize((420, 420), Image.Resampling.BILINEAR)
candidates = []
for y in range(6, 414):
    for x in range(6, 414):
        r, g, b = pixels.getpixel((x, y))
        luma = (r * 0.5 + g * 0.35 + b * 0.15) / 255
        if luma > 0.08 and random() < luma ** 0.65 * 0.7:
            candidates.append((x / 420, y / 420, luma))
for i in range(len(candidates) - 1, 0, -1):
    j = math.floor(random() * (i + 1))
    candidates[i], candidates[j] = candidates[j], candidates[i]
shuffled_seed = seed

for label, limit in [('mobile', 6500), ('desktop', 11500)]:
    seed = shuffled_seed
    points, levels, sizes = [], [], []
    for x, y, luma in candidates[:limit]:
        ex, ey = (x - 0.66) / 0.34, (y - 0.51) / 0.48
        shell = math.sqrt(max(0, 1 - ex * ex - ey * ey)) * 0.14
        nose = 0.065 * math.exp(-((x - 0.69) ** 2 / 0.002 + (y - 0.54) ** 2 / 0.011))
        points.extend((x, y, shell + nose + (luma - 0.4) * 0.018))
        levels.append(0.35 + luma * 0.65)
        sizes.append(0.8 + random() * 0.8 + luma * 0.35)
    count = len(levels)
    # PFL1 magic, count, post-sampling RNG seed, then float32 positions/levels/sizes.
    values = points + levels + sizes
    payload = struct.pack('<4sII', b'PFL1', count, seed) + struct.pack(f'<{len(values)}f', *values)
    target = OUTPUT / f'portrait-{label}.bin'
    target.write_bytes(payload)
    print(f'{target.relative_to(ROOT)}: {count} points, {len(payload):,} bytes')
