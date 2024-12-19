/**
 * Configuration de Vite pour le projet.
 *
 * @module vite.config
 * @see {@link https://vitejs.dev/config/}
 *
 * @property {Object} server - Configuration du serveur.
 * @property {number} server.port - Port du serveur.
 * @property {Object} server.https - Configuration HTTPS.
 * @property {string} server.https.cert - Chemin vers le certificat HTTPS.
 * @property {string} server.https.key - Chemin vers la clé privée HTTPS.
 *
 * @property {Array} plugins - Liste des plugins utilisés.
 *
 * @property {Array} assetsInclude - Liste des types de fichiers à inclure.
 */

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import fs from 'fs'

const options = {
  server: {
    port: 5041,
    https: {
      cert: fs.readFileSync('/home/user/Dev/dev-certificates/localhost.crt'),
      key: fs.readFileSync('/home/user/Dev/dev-certificates/localhost.key')
    }
  },
  plugins: [svelte()],
  assetsInclude: ['**/*.ttf'],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(options)
