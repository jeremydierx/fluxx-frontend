![Fluxx Frontend par Code Alchimie](./public/img/fluxx-frontend.png)

# Fluxx Frontend

Ce projet est une application web de type Single Page Application (SPA) développée avec Svelte et Vite. Il sert de base de départ pour la réalisation d’applications SPA.

## Stack technologique

### Svelte

**Svelte** est un framework JavaScript moderne qui permet de créer des interfaces utilisateur réactives. Svelte compile les composants en JavaScript optimisé au moment de la construction, ce qui permet un rendu ultra-rapide et une interaction fluide. Contrairement à d'autres frameworks, Svelte n'inclut pas de runtime ou bibliothèque volumineuse dans le bundle final, ce qui réduit la taille des fichiers JavaScript envoyés au navigateur.

### Vite

**Vite** est un bundler et serveur de développement rapide, qui offre une excellente expérience de développement. Vite révolutionne le flux de travail du développement web avec sa rapidité, sa simplicité de configuration et son support des technologies modernes. Il améliore l'expérience des développeurs grâce à des temps de démarrage instantanés, des mises à jour à chaud rapides, et une compatibilité étendue avec différents frameworks front-end, faisant de lui un choix idéal pour les projets web modernes.

### Intégration de la Stack

L'intégration de Svelte et Vite offre une solution puissante et efficace pour le développement d'applications web modernes. Svelte, avec sa syntaxe concise et ses performances optimisées, combiné à Vite, avec son démarrage instantané et son Hot Module Replacement ultra-rapide, permet de créer des applications réactives et performantes avec une expérience développeur exceptionnelle. Cette combinaison réduit les temps de build et simplifie la configuration, tout en offrant une flexibilité maximale grâce à la compatibilité avec les fonctionnalités modernes et divers frameworks front-end. Ensemble, Svelte et Vite forment une stack de développement idéale pour des projets rapides, maintenables et à hautes performances.

## Structure du projet

``` bash
frontend/
├── public/                  # Contient les ressources publiques telles que les images, les manifestes, etc.
├── src/                     # Contient le code source de l'application
│   ├── components/          # Composants réutilisables de Svelte
│   ├── lib/                 # Modules d'aide et stores Svelte
│   ├── routes/              # Composants de routage pour différentes pages
│   ├── style/               # Fichiers de style SCSS
│   ├── App.svelte           # Composant principal de l'application
│   ├── config.example.js    # Exemple de configuration de l'application
│   └── main.js              # Point d'entrée de l'application
├── .nvmrc                   # Version de Node.js à utiliser
├── eslint.config.mjs        # Configuration d'ESLint
├── jsconfig.json            # Configuration de JavaScript pour le projet
├── package.json             # Dépendances et scripts du projet
├── svelte.config.js         # Configuration de Svelte
├── vite.config.js           # Configuration de Vite
├── remoteDeploy.example.sh  # Exemple de script pour déployer en production
└── README.md                # Documentation du projet
```

## Diagramme séquentiel du flux d’authentification de l’utilisateur

![Diagramme séquentiel du flux d’authentification de l’utilisateur](./public/img/authentication-diagram-frontend.svg)

## Installation

Pour installer et exécuter le projet en local, suivez les étapes suivantes :

1. **Cloner le dépôt**

```bash
git clone git@deployment:jeremydierx/fluxx-frontend.git
cd fluxx-frontend
```

2. **Installer les dépendances**

```bash
npm install
```

3. ** Adapter les fichiers de configuration à vos besoins**

```bash
cp vite.config.example.js vite.config.js
cp src/config.example.js src/config.js
cp remoteDeploy.example.sh remoteDeploy.sh
```

## En local

### Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible à l'adresse `https://localhost:[port]` où `[port]` est le port configuré dans le fichier `vite.config.js`.

### Génération de la documentation intégrée (JSDoc)

``` bash
$ npm run docs
```

### Linting

``` bash
$ npm run lint
```

## En distant (serveur de production)

### Commandes de Déploiement pour l'Environnement de Production

``` bash
$ npm run remoteDeployProd
```

### Commandes de Maintenance pour l'Environnement de Production

``` bash
$ npm run remoteMaintenanceOnProd # Activer le mode maintenance
$ npm run remoteMaintenanceOffProd # Désactiver le mode maintenance
```

## Pourquoi je n’utilise pas de framework «tout-en-un» ?

### Apprentissage en Profondeur:

- **Masquage de la Complexité** : Les frameworks tout-en-un ont tendance à abstraire beaucoup de complexités, ce qui peut empêcher les développeurs d'apprendre et de comprendre les mécanismes sous-jacents. Cette abstraction peut limiter la capacité des développeurs à résoudre des problèmes complexes ou à optimiser les performances de manière efficace.
- **Dépendance au Framework** : Une dépendance excessive à un framework spécifique peut restreindre la flexibilité des développeurs et les rendre moins adaptables à d'autres technologies ou paradigmes.

### Surcharge Fonctionnelle:

- **Overkill pour les Projets Simples** : Ces frameworks viennent souvent avec une multitude de fonctionnalités intégrées qui peuvent être superflues pour de nombreux projets, rendant la configuration initiale et la maintenance plus lourdes et complexes.
- **Performance Impactée** : L'inclusion de fonctionnalités non nécessaires peut alourdir l'application et impacter ses performances, surtout si ces fonctionnalités ne sont pas utilisées mais continuent de consommer des ressources.

### Flexibilité Limitée:

- **Personnalisation Difficile** : La personnalisation ou l'extension des fonctionnalités d'un framework tout-en-un peut être difficile ou impossible sans recourir à des hacks ou des contournements, ce qui peut nuire à la maintenabilité du code.
- **Contraintes architecturales** : Ces frameworks imposent souvent une architecture et une structure spécifiques, limitant la capacité des développeurs à adapter l'application à des besoins uniques ou à adopter des meilleures pratiques qui sortent du cadre défini par le framework.

## Le principe KIS (Keep It Simple)

Le principe **KIS (Keep It Simple)** prône la simplicité et l'absence de complexité inutile dans le développement et la conception. En privilégiant des solutions directes et faciles à comprendre, ce principe facilite la maintenance, réduit les erreurs et améliore l'efficacité. En se concentrant sur l'essentiel et en éliminant les éléments superflus, **KIS** permet de créer des systèmes plus robustes, plus accessibles et plus rapides à mettre en œuvre. Adopter **KIS** aide les équipes à rester agiles, à réduire les coûts et à livrer des produits de qualité supérieure en évitant les complications inutiles.

### Éviter la programmation orientée objet (POO)

Préférez les fonctions et les structures de données simples aux classes et objets complexes pour réduire la complexité du code.

### Utiliser JSDOC à la place de TypeScript

Documentez votre code JavaScript avec JSDoc pour bénéficier de l'auto-complétion et de la vérification des types, sans la complexité supplémentaire de TypeScript.

### Privilégier les solutions simples

Choisissez toujours la solution la plus simple et directe pour résoudre un problème, même si elle semble moins élégante ou moins sophistiquée.

### Éviter les abstractions inutiles

Limitez l'utilisation des abstractions (comme les interfaces, les frameworks complexes) qui peuvent rendre le code plus difficile à comprendre et à maintenir.

### Utiliser des noms de variables et de fonctions explicites

Choisissez des noms clairs et significatifs pour vos variables et fonctions afin de rendre le code auto-documenté.

### Diviser le code en petites fonctions

Écrivez des fonctions courtes et spécifiques qui effectuent une seule tâche, ce qui facilite la compréhension et la maintenance.

### Minimiser les dépendances

Réduisez le nombre de bibliothèques et de frameworks externes pour limiter les points de défaillance et simplifier la gestion des mises à jour.

### Favoriser la composition plutôt que l'héritage

Utilisez la composition de fonctions et de modules au lieu de l'héritage pour structurer votre code, ce qui permet de réutiliser et de tester plus facilement les composants.

### Écrire des tests simples et clairs

Rédigez des tests unitaires et d'intégration qui sont faciles à comprendre et à maintenir, couvrant les cas d'utilisation principaux sans surcharger le projet.

### Limiter les commentaires

Évitez de commenter chaque ligne de code. Utilisez des commentaires uniquement lorsque cela est nécessaire pour expliquer des choix non évidents.

### Utiliser des outils de linters

Employez des outils de linting comme ESLint pour automatiser la vérification de la qualité et la cohérence du code.

### Suivre les conventions de code

Adoptez et respectez des conventions de codage claires et bien définies pour maintenir un code cohérent et lisible par tous les membres de l'équipe.

### Éviter les optimisations prématurées

Ne vous concentrez pas sur l'optimisation du code avant de vérifier qu'il y a effectivement un problème de performance. Priorisez la simplicité et la clarté.

### Favoriser l'utilisation de l'outillage standard

Utilisez les fonctionnalités natives du langage et des environnements de développement avant de recourir à des solutions externes ou sur-mesure.

### Conclusion
En suivant ces principes **KIS**, vous pourrez créer des systèmes plus simples, plus robustes et plus faciles à maintenir, tout en réduisant les coûts et le temps de développement.

![Code Alchimie](./public/img/logo.png)