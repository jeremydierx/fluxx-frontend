/**
 * Fonction de configuration de l'environnement.
 *
 * @module config
 *
 * @returns {Object} - Configuration de l'environnement.
 * @property {string} backendApi - URL de l'API backend.
 * @property {string} backendEvent - URL de l'événement backend.
 * @property {string} sharedUrl - URL des ressources partagées.
 * @property {string} env - Environnement actuel ('development', 'staging', 'production').
 */

export default function () {
  const env = 'development'
  switch (env) {
  case 'development':
    return {
      backendApi: `https://${window.location.hostname}:5010/api`,
      backendEvent: `https://${window.location.hostname}:5010/event`,
      sharedUrl: `https://${window.location.hostname}:5012/shared/assets/images`,
      env
    }

  case 'staging':
    return {
      backendApi: 'https://fluxx.fr:5010/api',
      backendEvent: `https://${window.location.hostname}:5010/event`,
      sharedUrl: 'https://fluxx.fr:5010/shared/assets/images',
      env
    }

  case 'production':
    return {
      backendApi: 'https://fluxx.fr/api',
      backendEvent: `https://${window.location.hostname}:5010/event`,
      sharedUrl: 'https://fluxx.fr/shared/assets/images',
      env
    }
  }
}
