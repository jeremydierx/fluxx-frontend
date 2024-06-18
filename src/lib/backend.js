/**
 * Module pour l'interaction avec le backend.
 *
 * @module backend
 *
 * @requires ./helpers - Pour les fonctions d'aide.
 * @requires ./store - Pour l'accès au store de l'application.
 *
 * @property {Object} getAppConfig - Configuration de l'application.
 *
 */

import {
  getRequestOptions,
  signOut
} from './helpers'
import {
  appConfig,
  mainError,
  isLoading,
  userAuthState
} from './store'

// souscription au store
let getAppConfig
appConfig.subscribe(value => { getAppConfig = value })

/**
 * Définit une erreur si elle existe dans la réponse du backend.
 *
 * @function setErrorIfExists
 * @param {Object} data - Données de la réponse du backend.
 * @property {boolean} data.error - Indique si une erreur est présente.
 * @property {string} data.message - Message de l'erreur.
 *
 * @requires ./store - Pour l'accès au store de l'application.
 * @requires ./store.mainError - Pour l'accès au store des erreurs principales.
 */
function setErrorIfExists (data) {
  if (data.error) {
    // TODO : en attendant de mettre les clear
    // timeouts dans le store pour suppression
    // des timeouts en cas de déconnexion
    if (data.message !== 'Missing x-srf-token (headers)') {
      mainError.set({
        error: true,
        message: `Erreur : ${data.message}`
      })
    }
  }
}

/**
 * Envoie une requête GET pour obtenir un nouveau jeton d'actualisation. Si la
 * requête est réussie, le jeton d'actualisation est stocké dans le localStorage.
 * En cas d'erreur, si le code d'état est 401, la fonction signOut est appelée.
 *
 * @async
 * @function getRefreshToken
 * @returns {Promise<Object>} Les données de la réponse, qui peuvent inclure un
 * jeton d'actualisation ou des informations d'erreur.
 */
export const getRefreshToken = async function () {
  const options = getRequestOptions('GET', true)
  const res = await window.fetch(`${getAppConfig.backendApi}/users/refreshToken`, options)
  const data = await res.json()
  setErrorIfExists(data)
  if (!data.error) {
    localStorage.setItem('xsrfToken', data.xsrfToken)
  } else {
    if (data.statusCode === 401) signOut()
  }
  return data
}

/**
 * Initialise l'authentification de l'utilisateur. Cette fonction envoie une
 * requête GET à l'API backend pour obtenir les informations d'authentification
 * de l'utilisateur. Si la requête est réussie, elle met à jour l'état
 * d'authentification de l'utilisateur et renvoie les données reçues.
 *
 * @async
 * @function userAuthInit
 * @returns {Promise<Object>} Les données d'authentification de l'utilisateur.
 */
export const userAuthInit = async function () {
  isLoading.set(true)
  const options = getRequestOptions('GET', true)
  const res = await window.fetch(`${getAppConfig.backendApi}/users/getAuth`, options)
  const data = await res.json()
  if (!data.error) userAuthState.set(data)
  isLoading.set(false)
  return data
}

/**
 * Envoie une requête POST pour se connecter à l'application. Cette fonction
 * prend en entrée les informations d'identification de l'utilisateur, les
 * nettoie, puis envoie une requête POST à l'API backend. Si la requête est
 * réussie, elle met à jour l'état d'authentification de l'utilisateur et
 * stocke le jeton xsrf dans le localStorage.
 *
 * @async
 * @function signIn
 * @param {Object} credentials - Les informations d'identification de
 * l'utilisateur.
 * @param {string} credentials.email - L'email de l'utilisateur.
 * @param {string} credentials.password - Le mot de passe de l'utilisateur.
 * @param {string} credentials.authMethod - La méthode d'authentification
 * choisie par l'utilisateur.
 * @returns {Promise<Object>} Les données de la réponse, qui peuvent inclure
 * des informations d'authentification ou des informations d'erreur.
 */
export const signIn = async function (credentials) {
  isLoading.set(true)
  credentials.password = credentials.password.trim()
  credentials.email = credentials.email.trim()
  credentials.authMethod = credentials.authMethod.trim()

  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  const res = await fetch(`${getAppConfig.backendApi}/users/signIn`, {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(credentials),
    credentials: 'include'
  })
  const data = await res.json()
  setErrorIfExists(data)
  if (data.statusCode === 401) signOut()

  if (!data.error) {
    localStorage.setItem('xsrfToken', data.xsrfToken)
    userAuthState.set({
      isAuth: data.isAuth,
      user: data.user
    })
  } else {
    userAuthState.set({ isAuth: false })
  }
  isLoading.set(false)
  return data
}

/**
 * Envoie une requête POST pour demander la réinitialisation du mot de passe
 * d'un utilisateur. Cette fonction prend en entrée l'email de l'utilisateur,
 * puis envoie une requête POST à l'API backend. Si la requête est réussie,
 * un email est envoyé à l'utilisateur avec un lien pour réinitialiser son mot
 * de passe.
 *
 * @async
 * @function askResetPassword
 * @param {string} email - L'email de l'utilisateur.
 * @returns {Promise<Object>} Les données de la réponse, qui peuvent inclure
 * des informations de succès ou des informations d'erreur.
 */
export const askResetPassword = async function (email) {
  isLoading.set(true)
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  const res = await fetch(`${getAppConfig.backendApi}/users/askResetPassword`, {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify({ email })
  })
  const data = await res.json()
  setErrorIfExists(data)
  isLoading.set(false)
  return data
}

/**
 * Envoie une requête POST pour réinitialiser le mot de passe d'un utilisateur.
 * Cette fonction prend en entrée le nouveau mot de passe de l'utilisateur et
 * le token de réinitialisation, puis envoie une requête POST à l'API backend.
 * Si la requête est réussie, le mot de passe de l'utilisateur est réinitialisé.
 *
 * @async
 * @function resetPassword
 * @param {string} password - Le nouveau mot de passe de l'utilisateur.
 * @param {string} token - Le token de réinitialisation du mot de passe.
 * @returns {Promise<Object>} Les données de la réponse, qui peuvent inclure
 * des informations de succès ou des informations d'erreur.
 */
export const resetPassword = async function (password, token) {
  isLoading.set(true)
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  const res = await fetch(`${getAppConfig.backendApi}/users/resetPassword`, {
    method: 'PUT',
    headers,
    mode: 'cors',
    body: JSON.stringify({ password, token })
  })
  const data = await res.json()
  setErrorIfExists(data)
  isLoading.set(false)
  return data
}
