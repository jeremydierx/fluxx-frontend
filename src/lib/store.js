/**
 * Module de gestion des stores Svelte.
 *
 * @module store
 *
 * @requires svelte/store - Pour la création de stores Svelte.
 *
 * @property {Object} appConfig - Store pour la configuration de l'application.
 * @property {boolean} isLoading - Store pour l'état de chargement.
 * @property {Object} mainError - Store pour l'erreur principale.
 * @property {string} mainError.error - Indique si une erreur est présente.
 * @property {string} mainError.message - Message de l'erreur.
 * @property {Object} mainSuccess - Store pour le succès principal.
 * @property {string} mainSuccess.success - Indique si un succès est présent.
 * @property {string} mainSuccess.message - Message du succès.
 * @property {number} showTimeoutInfo - Store pour le délai d'affichage des informations.
 * @property {Object} userAuthState - Store pour l'état d'authentification de l'utilisateur.
 * @property {boolean} userAuthState.isAuth - Indique si l'utilisateur est authentifié.
 */

import { writable, readable } from 'svelte/store'

export const appConfig = writable({})

export const isLoading = writable(false)

export const mainError = writable({ error: false, message: '' })

export const mainSuccess = writable({ success: false, message: '' })

export const showTimeoutInfo = readable(2000)

export const userAuthState = writable({ isAuth: false })
