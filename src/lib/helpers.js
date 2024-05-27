/**
 * Module de fonctions d'aide pour l'application.
 *
 * @module helpers
 *
 * @requires svelte-spa-router - Pour le routage de l'application.
 * @requires ./store.js - Pour l'accès au store de l'application.
 *
 */

import { replace } from 'svelte-spa-router'
import { userAuthState } from './store.js'

/**
 * Retourne les options pour une requête fetch.
 *
 * @function getRequestOptions
 * @param {string} verb - Le verbe HTTP de la requête.
 * @param {boolean} [withAuth=false] - Indique si la requête nécessite une authentification.
 * @param {string} [contentType='application/json'] - Le type de contenu de la requête.
 * @returns {Object} options - Les options de la requête.
 * @property {string} options.method - Le verbe HTTP de la requête.
 * @property {string} options.mode - Le mode de la requête (cors).
 * @property {Object} options.headers - Les en-têtes de la requête.
 * @property {string} options.headers['Content-Type'] - Le type de contenu de la requête.
 * @property {string} options.credentials - Les informations d'identification de la requête (include).
 * @property {string} [options.headers['x-srf-token']] - Le token XSRF si l'authentification est nécessaire.
 */
export const getRequestOptions = (verb, withAuth = false, contentType = 'application/json') => {
  const options = {
    method: verb,
    mode: 'cors',
    headers: {
      'Content-Type': contentType
    },
    credentials: 'include'
  }
  if (withAuth) {
    const xsrfToken = window.localStorage.getItem('xsrfToken')
    if (xsrfToken) options.headers['x-srf-token'] = xsrfToken
  }
  return options
}

/**
 * Déconnecte l'utilisateur.
 *
 * @function signOut
 * @requires svelte-spa-router - Pour le routage de l'application.
 * @requires ./store.js - Pour l'accès au store de l'application.
 *
 * @effects Supprime le token XSRF du localStorage.
 * @effects Supprime les cookies 'refresh_token' et 'access_token'.
 * @effects Met à jour le store 'userAuthState' pour indiquer que l'utilisateur n'est plus authentifié.
 * @effects Redirige l'utilisateur vers la page de connexion.
 */
export const signOut = () => {
  localStorage.removeItem('xsrfToken')
  document.cookie = 'refresh_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = 'access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
  userAuthState.set({ isAuth: false })
  replace('/sign-in')
}
