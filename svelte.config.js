/**
 * Configuration de Svelte pour le projet.
 *
 * @module svelte.config
 * @see {@link https://svelte.dev/docs#compile-time-svelte-preprocess}
 *
 * @property {Object} preprocess - Configuration du préprocesseur.
 * @property {function} preprocess.vitePreprocess - Fonction du préprocesseur Vite.
 */

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess()
}
