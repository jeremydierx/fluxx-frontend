/**
 * Point d'entrée principal de l'application.
 *
 * @module main
 *
 * @requires ./style/index.scss - Importe les styles globaux.
 * @requires ./App.svelte - Importe le composant App.
 *
 * @property {Object} app - Instance de l'application.
 * @property {Object} app.target - Cible du DOM pour le rendu de l'application.
 *
 * @exports app - Exporte l'instance de l'application.
 */

import './style/index.scss'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
