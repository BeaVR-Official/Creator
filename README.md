<p align="center">
<img width="300" src="/README/2017_logo_beavr.png">
</p>

# BeaVR - CREATOR

## Rappel du projet

BeaVR est une plateforme d'apprentissage utilisant la réalité virtuelle afin de proposer une approche pédagogique innovante. Au travers du Store et du Creator, nous permettons à chaque utilisateur de se positionner en tant qu'acteur ou créateur de contenu sans restriction autre que de posséder le matériel de réalité virtuelle.

Pour les acteurs nous mettons à disposition le Store depuis lequel pourront être téléchargées les applications depuis une interface simple d'utilisation et intuitive.
Pour les créateur de contenu expérimentés, une interface spécifique permet de publier et de gérer ses applications sur le Store.

Enfin, pour les personnes désireuses de partager leur savoir sans pour autant posséder des compétence techniques, nous mettons à disposition gratuitement un créateur d'applications, notre Creator. Ce dernier, user-friendly et simple d'utilisation, permet à chacun de concevoir en quelques clics sa propre application d'apprentissage afin de la publier directement sur le Store pour la partager avec la communauté.

## Version <img style="width:10%; text-align:center;s" src="https://travis-ci.com/ekersale/beavr-creator.svg?token=x7qbxW6dvqqfhQ4xsHKt&branch=master">

`1.0` Initialisation du projet, intégration des outils de développement/déploiement/collaboration


## Installation

Avant de pouvoir utiliser le programme, l'installation de plusieurs packages est nécessaire.

Lancer afin d'installer les dépendances :
```bash
npm install
```

## Configuration de WebStorm pour Gulp+Webpack

<img src="/README/Conf-Gulp-Files.png">

Configuration obligatoire pour la compilation automatique des fichiers.

## Architecture de développement

```
beavr-creator
├── app
│   ├── dist (Code compilé)
│   ├── assets (Ressources statiques)
│   │   ├── 3dmodels
│   │   ├── css
│   │   └── images
│   ├── libs (Librairies JS externes / Vendors)
│   │   └── ...
│   ├── src (Code source)
│   │   ├── creator.js
│   │   ├── helpers (Snippets)
│   │   ├── models (Modèles de données)
│   │   └── modules (Modules ES6)
│   │       └── ...
│   ├── tests (Batterie de tests)
│   │   ├── index.html
│   │   └── tests.js
│   └── index.html
├── README
├── README.md
├── package.json (Configuration NPM)
├── webpack.config.js (Configuration Webpack)
├── gulpfile.js (Configuration des taches)
├── .eslintrc (Configuration de la norme)
├── .travis.yml (Configuration déploiement Travis)
└── .gitignore
```

## Débugage



## Commandes NPM

```bash
npm run clean
npm run build
npm run test
npm run watch
npm run watch-n-test
```

## Contributions

Instruction pour l'utilisation du Git.
* Pour la mise à jour de document, les sections mises à jour doivent être spécifiées dans la partie version.
* Pour les mises à jour de la partie documentation, les commits doivent se faire sur la branche /documentation tant que la documentation n'est pas dans sa version final.
* Pour les mises à jour dans la partie application, les commits doivent se faire sur la branche /application tant que le code n'est pas fonctionnel ou est dans sa version final.
* Après commit, vérifier l'intégration avec le retour du logiciel Travis.

Les messages de commit doivent respecter la norme suivante : 

```sh
[<Type>] (<Scope>) : <Subject>
<BLANK LINE>
<body>
```

Type 	: [Fonctionnalités / Doc / Debug]

Scope	: [Initialisation / Intégration / Sauvegarde / PanneauObj]

Body	: [Explication des changements]

Les fusions(merges) sur la branche de déploiement se font quand les fonctionnalités implémentées sont fonctionnelles et correctes pour le fonctionnement entier de l'application.

Si un bug est décelé dans une partie précédemment push, une branche Bug peut être créé afin de corriger ce bug et tester l'intégrité du programme avant d'être merge.


## Addresse de déploiement

Travis déploie automatiquement sur Heroku quand la compilation passe.

```sh
https://git.heroku.com/beavr-creator-build.git
```

## Documentation

Une documentation utilisateur sera rédigée afin de détailler l'utilisation du Créator. 

Hello
