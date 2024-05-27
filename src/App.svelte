<script>

  /**
   * Composant principal de l'application.
   *
   * @module App
   *
   * @requires svelte-spa-router - Pour le routage de l'application.
   * @requires ./routes/Home.svelte - Composant de la page d'accueil.
   * @requires ./components/Error.svelte - Composant pour l'affichage des erreurs.
   * @requires ./components/Success.svelte - Composant pour l'affichage des succès.
   * @requires ./lib/store - Pour l'accès au store de l'application.
   * @requires ./config - Pour la configuration de l'application.
   * @requires ./routes/admin/Home.svelte - Composant de la page d'accueil de l'admin.
   * @requires ./lib/backend - Pour l'interaction avec le backend.
   * @requires ./routes/SignIn.svelte - Composant de la page de connexion.
   * @requires svelte - Pour l'utilisation des hooks de cycle de vie de Svelte.
   *
   * @property {Object} appConfig - Configuration de l'application.
   * @property {Object} userAuthState - État d'authentification de l'utilisateur.
   *
   * @function config - Initialise la configuration de l'application.
   * @function userAuthInit - Initialise l'authentification de l'utilisateur.
   * @function getRefreshToken - Obtient le token de rafraîchissement.
   *
   * @component Home - Composant de la page d'accueil.
   * @component Error - Composant pour l'affichage des erreurs.
   * @component Success - Composant pour l'affichage des succès.
   * @component AdminHome - Composant de la page d'accueil de l'admin.
   * @component SignIn - Composant de la page de connexion.
   */

  import Router, { replace } from 'svelte-spa-router'
  import { wrap } from 'svelte-spa-router/wrap'
  import Home from './routes/Home.svelte'
  import Error from './components/Error.svelte'
  import Success from './components/Success.svelte'
  import {
    appConfig,
    userAuthState
  } from './lib/store'
  import config from './config'
  import AdminHome from './routes/admin/Home.svelte'
  import {
    userAuthInit,
    getRefreshToken
  } from './lib/backend'
  import SignIn from './routes/SignIn.svelte'
  import { onDestroy } from 'svelte'

  /**
   * CONFIG
   */

  $appConfig = config()

  /**
   * REFRESH TOKEN
   */

  const refreshTokenInterval = 60000 // 1min
  const intervalRefreshTockenId = setInterval(async () => {
    if ($userAuthState.isAuth) {
      getRefreshToken()
    }
  }, refreshTokenInterval)

  /**
   * LOGIQUES DES DROIT D’ACCÈS
   */

  let onlyAdmin
  $: onlyAdmin = (
    $userAuthState.user && $userAuthState.isAuth && $userAuthState.user.role === 'admin'
  )

  /**
   * ROUTES
   */

   const routes = {
     '/': wrap({
       component: Home
     }),
     '/admin': wrap({
       component: AdminHome,
       conditions: [
         async () => {
           if (!$userAuthState.isAuth) await userAuthInit()
           return onlyAdmin
         }
       ]
     }),
     '/sign-in': wrap({
       component: SignIn
     })
   }

   /**
   * CONTRÔLE D’ACCÈS
   */

  function conditionsFailed () {
    if (!$userAuthState.user || !$userAuthState.isAuth) {
      replace('/sign-in')
    }
  }

  onDestroy(() => {
    clearInterval(intervalRefreshTockenId)
  })

</script>

<style lang='scss'>

  @import './style/variables';

</style>

<div class="content">
  <Error/>
  <Success/>
  <main>
    <Router {routes} on:conditionsFailed={conditionsFailed}/>
  </main>
</div>