# Étude de signature — deuxième itération

## Brief

Identité personnelle de Maxime de Visscher. Le nom complet doit rester identifiable.
Retour du 16 septembre : première série rejetée, jugée générique et insuffisamment
réfléchie. Préférence explicite : « Sobre et affirmé, avec une forte présence
typographique ».

## Direction

La composition du nom fait la marque. Aucun pictogramme, monogramme ajouté, étoile,
point coloré ni référence littérale au code. Le portrait anime déjà la page ; la
signature apporte un élément stable. Essais en une couleur, positifs et négatifs.

- Bloc : Bricolage Grotesque 650, largeur 94, taille optique 32. Deux lignes à taille
  et graisse identiques. Approches et paires ajustées. 170 × 59 px dans le header.
- Ligne : Syne 640. Lecture continue, proportions horizontales, paires ajustées.
  262 × 23 px sur ordinateur, largeur 248 px sur mobile.

Ces essais utilisent des caractères existants. La composition et les espacements
sont travaillés ; les glyphes ne sont pas revendiqués comme un dessin original.
Les SVG contiennent les contours pour conserver précisément la composition.
`build_wordmarks.py` permet de les régénérer (fontTools et Pillow).

## Sources

- https://ateliertriay.github.io/bricolage/
- https://lucasdescroix.fr/words/atypical-gathering
- Fichiers de police : dépôt officiel google/fonts, licences OFL incluses.

## Prévisualisation

Depuis la racine du projet : `python3 -m http.server 60961 --bind 127.0.0.1`.
Ouvrir http://localhost:60961/prototypes/header-logos-v2/.
Portrait fixe et navigation de démonstration. Aucun changement au site Astro.
