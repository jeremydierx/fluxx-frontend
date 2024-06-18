<script>

  /**
   * Composant de la page de réinitialisation du mot de passe.
   *
   * @module ResetPassword
   *
   * @requires svelte-spa-router - Pour le routage de l'application.
   * @requires ../lib/backend - Pour l'interaction avec le backend.
   * @requires ../lib/store - Pour l'accès au store de l'application.
   * @requires ../components/Spinner.svelte - Composant pour l'affichage d'un spinner de chargement.
   *
   * @property {Object} params - Les paramètres de la route.
   * @property {string} newPassword - Le nouveau mot de passe de l'utilisateur.
   * @property {boolean} isLoading - Indique si une requête est en cours.
   *
   * @function handleOnSubmit - Gère la soumission du formulaire de réinitialisation du mot de passe.
   */

  import { replace } from 'svelte-spa-router'
  import Spinner from '../components/Spinner.svelte'
  import { userAuthState } from '../lib/store'
  import { resetPassword } from '../lib/backend'

  export let params = {}

  let newPassword = ''

  const isLoading = false

  if (userAuthState.isAuth) replace('/admin')

  async function handleOnSubmit () {
    await resetPassword(newPassword, params.token)
    replace('/sign-in')
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

  .cancel {
    margin-top: 20px;
    text-align: center;
    a {
      color: $clr-blue;
      text-decoration: none;
    }
  }

</style>

<div class="container">

  <form on:submit|preventDefault={handleOnSubmit}>

    <div class="input">
      <input type="password" id="password" placeholder="Nouveau mot de passe" minlength="8" bind:value={newPassword} required>
    </div>

    <div class="btn">
      <input type="submit" disabled={isLoading ? 'disabled' : ''} value="VALIDER"/>
      <Spinner class="spinner"/>
    </div>

    <div class="cancel">
      <a href="/#/sign-in">Annuler</a>
    </div>

  </form>

</div>

