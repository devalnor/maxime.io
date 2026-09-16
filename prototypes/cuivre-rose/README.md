# Cuivre rosé — prototype du site personnel

Mockup HTML autonome, distinct du site Astro. Aucun déploiement n’est nécessaire.

## Lancement

Depuis la racine du dépôt :

```sh
python3 -m http.server 60960 --directory prototypes/cuivre-rose
```

Ouvrir http://localhost:60960/. Si ce port est déjà occupé par la prévisualisation, choisir un autre port.

Le panneau de réglages est chargé uniquement avec `?settings=1`. Il permet de rejouer la construction du portrait, mettre l’animation en pause, ajuster les paramètres, restaurer les valeurs initiales et exporter un JSON. Les réglages de test sont conservés dans le navigateur et ne sont lus qu’avec ce flag. Sans flag, le prototype utilise ses valeurs par défaut.

## Portrait

Le portrait est rendu en Three.js à partir de points échantillonnés dans `assets/portrait.png`. Un relief procédural fournit la profondeur : ce n’est pas un scan anatomique de la tête. Les particules en mouvement deviennent des triangles pliés, orientés selon leur vitesse 3D avec une interpolation des rotations.

L’apparition combine déplacement, fondu, freinage, directions de départ et courbures individuelles. Les tirages sont déterministes et réutilisés à chaque rebuild. Le côté gauche se disperse tandis que le côté droit reste plus stable. La souris provoque une déviation tournante avec des variations individuelles de rayon et de profondeur.

Il n’y a plus de boids libres ni de petites animations secondaires. Le canvas accompagne le défilement du document. Les préférences de réduction du mouvement, la pause et la visibilité de la page sont prises en compte.

Three.js est fourni localement avec sa licence dans `assets/vendor/`. Les autres assets sont également locaux.

## Vérifications

La syntaxe des modules et des scénarios ciblés de simulation ont été vérifiés pendant les itérations : coordonnées finies, convergence, fondu, diversité des directions et interaction avec la souris. Le prototype a été utilisé dans le navigateur T3Code. Le flag URL a été vérifié avec et sans réglages sauvegardés.
