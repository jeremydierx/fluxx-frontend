<script>

  /**
   * Composant de la page de connexion.
   *
   * @module SignIn
   *
   * @requires ../lib/backend - Pour l'interaction avec le backend.
   * @requires svelte-spa-router - Pour le routage de l'application.
   * @requires ../lib/store - Pour l'accès au store de l'application.
   * @requires ../components/Spinner.svelte - Composant pour l'affichage d'un spinner de chargement.
   *
   * @property {Object} credentials - Les informations d'identification de l'utilisateur.
   * @property {string} credentials.email - L'email de l'utilisateur.
   * @property {string} credentials.password - Le mot de passe de l'utilisateur.
   * @property {string} credentials.authMethod - La méthode d'authentification.
   * @property {boolean} isLoading - Indique si une requête est en cours.
   *
   * @function handleOnSubmit - Gère la soumission du formulaire de connexion.
   */

  import { signIn } from '../lib/backend'
  import { replace } from 'svelte-spa-router'
  import { userAuthState } from '../lib/store'
  import Spinner from '../components/Spinner.svelte'

  const credentials = {
    email: '',
    password: '',
    authMethod: 'emailAuth'
  }
  const isLoading = false

  if (userAuthState.isAuth) replace('/admin')

  async function handleOnSubmit () {
    await signIn(credentials)
    replace('/admin')
  }

</script>

<style lang="scss">

  @import '../style/variables';

  .btn {
    background-color: $clr-blue;
    width: 100%;
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    input[type='submit'] {
      color: black;
      font-weight: bold;
      font-family: 'Montserrat', sans-serif;
      line-height: 40px;
    }
    input[type='submit'] {
      font-size: 1.4rem;
      height: 100%;
      background-color: transparent;
      border: none;
      width: auto;
    }
  }

  .container {
    width: 280px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
  }

  .input {
    margin-bottom: 20px;
    input {
      width: 100%;
      padding: 5px;
      border-radius: 3px;
      font-family: Arial, Helvetica, sans-serif;
      height: 40px;
      border: solid 1px $clr-grey-light;
    }
  }

</style>

<div class="container">

  <form on:submit|preventDefault={handleOnSubmit}>

    <div class="input">
      <input type="email" id="email" placeholder="Email" bind:value={credentials.email} required>
    </div>

    <div class="input">
      <input type="password" id="password" placeholder="Mot de passe" bind:value={credentials.password} required>
    </div>

    <div class="btn">
      <input type="submit" disabled={isLoading ? 'disabled' : ''} value="ENTRER"/>
      <Spinner class="spinner"/>
    </div>

  </form>

</div>
