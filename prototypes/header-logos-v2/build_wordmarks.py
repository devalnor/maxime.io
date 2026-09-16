"""Build vector wordmark studies from licensed typefaces; no font needed at display time."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import ImageFont
from html import escape
P=Path(__file__).parent

def face(name,axes):
 f=instantiateVariableFont(TTFont(P/f'assets/{name}.ttf'),axes,inplace=False)
 path=P/f'assets/{name}-study.ttf';f.save(path)
 return f,ImageFont.truetype(str(path),1000)

def line(font,pil,text,size,x,y,tracking=0,pairs=None):
 gs=font.getGlyphSet();cmap=font.getBestCmap();upm=font['head'].unitsPerEm;scale=size/upm
 paths=[];cursor=x;previous=''
 for ch in text:
  if previous:
   cursor+=(pil.getlength(previous+ch)-pil.getlength(previous)-pil.getlength(ch))*size/1000
   cursor+=(pairs or {}).get(previous+ch,0)*size/1000
  pen=SVGPathPen(gs);gs[cmap[ord(ch)]].draw(TransformPen(pen,(scale,0,0,-scale,cursor,y)))
  if pen.getCommands():paths.append(f'<path d="{pen.getCommands()}"/>')
  cursor+=pil.getlength(ch)*size/1000+tracking*size/1000;previous=ch
 return ''.join(paths),cursor-x-tracking*size/1000

f,pil=face('bricolage',{'wght':650,'wdth':94,'opsz':32})
a,w1=line(f,pil,'Maxime',100,0,76,-18,{'Ma':-12,'ax':-8,'xi':-14,'im':-8,'me':-5})
b,w2=line(f,pil,'de Visscher',100,0,166,-18,{'de':-8,' V':-12,'Vi':-25,'ss':-6,'sc':-6,'ch':-7,'he':-8,'er':-6})
# Optical alignment compensates for sidebearings rather than adding an ornament.
# Same size and weight on both lines: the surname is never treated as a subtitle.
width=max(w1,w2)
marks={'bloc':(a+b,width,170)}
f,pil=face('syne',{'wght':640})
a,w=line(f,pil,'Maxime de Visscher',100,0,78,-21,{'Ma':-12,'ax':-12,'xi':-18,'im':-10,'me':-5,'de':-9,'Vi':-24,'ss':-7,'sc':-8,'ch':-6,'he':-8})
marks['ligne']=(a,w,84)
for key,(paths,w,h) in marks.items():
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 {w+6:.2f} {h+6}" role="img" aria-label="Maxime de Visscher"><title>Maxime de Visscher</title><g fill="currentColor">{paths}</g></svg>'
 (P/f'{key}.svg').write_text(svg)
 # A neutral specimen for local visual inspection.
 preview=f'<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="420" viewBox="0 0 1100 420"><rect width="1100" height="420" fill="#eee9e2"/><g transform="translate(60 60) scale({min(950/w,280/h)})" fill="#211c20">{paths}</g></svg>'
 (P/f'{key}-specimen.svg').write_text(preview)
 print(key,round(w),h)
