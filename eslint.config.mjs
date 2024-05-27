/**
 * Configuration ESLint pour le projet.
 *
 * @module eslint.config
 * @see {@link https://eslint.org/docs/user-guide/configuring}
 *
 * @property {Array} files - Types de fichiers à cibler.
 * @property {Object} languageOptions - Options de langage.
 * @property {Object} languageOptions.globals - Globals pour le navigateur.
 * @property {number} languageOptions.ecmaVersion - Version ECMAScript.
 * @property {string} languageOptions.sourceType - Type de source.
 *
 * @property {Object} plugins - Plugins utilisés.
 *
 * @property {Object} rules - Règles ESLint.
 * @property {Array} rules.indent - Règle d'indentation.
 * @property {Array} rules.semi - Règle de point-virgule.
 * @property {Array} rules.quotes - Règle de guillemets.
 * @property {Array} rules['keyword-spacing'] - Règle d'espacement des mots-clés.
 * @property {Array} rules['space-before-function-paren'] - Règle d'espacement avant les parenthèses de fonction.
 * @property {Array} rules.eqeqeq - Règle d'égalité stricte.
 * @property {Array} rules['space-infix-ops'] - Règle d'espacement des opérateurs infixés.
 * @property {Array} rules['array-bracket-spacing'] - Règle d'espacement des crochets de tableau.
 * @property {Array} rules['block-spacing'] - Règle d'espacement des blocs.
 * @property {Array} rules['brace-style'] - Règle de style des accolades.
 * @property {Array} rules.camelcase - Règle de camelcase.
 * @property {Array} rules['comma-dangle'] - Règle de virgule finale.
 * @property {Array} rules['comma-spacing'] - Règle d'espacement des virgules.
 * @property {Array} rules['comma-style'] - Règle de style de virgule.
 */

import globals from 'globals'
import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'

export default [
  ...svelte.configs['flat/recommended'], // Inclure les règles recommandées pour Svelte
  {
    files: ['**/*.js', '**/*.svelte'], // Ciblez les fichiers JavaScript et Svelte
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    plugins: {
      svelte
    },
    rules: {
      indent: ['error', 2], // Règle pour 2 espaces en indentation
      semi: ['error', 'never'], // Règle pour désactiver les points-virgules
      quotes: ['error', 'single'], // Règle pour utiliser uniquement les single quotes pour les strings
      'keyword-spacing': ['error', { before: true, after: true }], // Règle pour ajouter un espace après les mots-clés
      'space-before-function-paren': ['error', 'always'], // Règle pour ajouter un espace avant les parenthèses de déclaration de fonction
      eqeqeq: ['error', 'always'], // Règle pour toujours utiliser === au lieu de ==
      'space-infix-ops': ['error', { int32Hint: false }], // Règle pour ajouter un espace autour des opérateurs infixés
      'array-bracket-spacing': ['error', 'never'], // Règle pour ne pas avoir d'espaces dans les crochets de tableau
      'block-spacing': ['error', 'always'], // Règle pour avoir des espaces dans les blocs
      'brace-style': ['error', '1tbs', { allowSingleLine: true }], // Règle pour le style des accolades
      camelcase: ['error', { properties: 'always' }], // Règle pour utiliser le camelcase
      'comma-dangle': ['error', 'never'], // Règle pour ne jamais avoir de virgule en fin
      'comma-spacing': ['error', { before: false, after: true }], // Règle pour l'espacement des virgules
      'comma-style': ['error', 'last'], // Règle pour placer la virgule à la fin
      'computed-property-spacing': ['error', 'never'], // Règle pour ne pas avoir d'espaces dans les propriétés calculées
      'eol-last': ['error', 'always'], // Règle pour avoir une ligne vide à la fin du fichier
      'func-call-spacing': ['error', 'never'], // Règle pour ne pas avoir d'espaces dans les appels de fonction
      'key-spacing': ['error', { beforeColon: false, afterColon: true }], // Règle pour l'espacement des clés dans les objets
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }], // Règle pour limiter les lignes vides multiples
      'no-trailing-spaces': ['error'], // Règle pour interdire les espaces en fin de ligne
      'object-curly-spacing': ['error', 'always'], // Règle pour avoir des espaces dans les accolades d'objet
      'padded-blocks': ['error', 'never'], // Règle pour ne pas avoir de padding dans les blocs
      'semi-spacing': ['error', { before: false, after: true }], // Règle pour l'espacement autour des points-virgules
      'space-before-blocks': ['error', 'always'], // Règle pour avoir un espace avant les blocs
      'space-in-parens': ['error', 'never'], // Règle pour ne pas avoir d'espaces dans les parenthèses
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }], // Règle pour espacer les commentaires
      'prefer-const': ['error'] // Règle pour transformer let en const si la variable n'est pas modifiée
    }
  },
  {
    ignores: ['out/', 'nodes_module', 'docs'], // Ignorer le dossier 'out'
  },
  js.configs.recommended // Utilisez la configuration recommandée de ESLint
]