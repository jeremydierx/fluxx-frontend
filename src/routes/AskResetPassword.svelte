<script>

  /**
   * Composant de la page de demande de réinitialisation du mot de passe.
   *
   * @module AskResetPassword
   *
   * @requires ../lib/backend - Pour l'interaction avec le backend.
   * @requires svelte-spa-router - Pour le routage de l'application.
   * @requires ../components/Spinner.svelte - Composant pour l'affichage d'un spinner de chargement.
   *
   * @property {string} email - L'email de l'utilisateur.
   * @property {boolean} isLoading - Indique si une requête est en cours.
   *
   * @function handleOnSubmit - Gère la soumission du formulaire de demande de réinitialisation du mot de passe.
   */

  import Spinner from '../components/Spinner.svelte'
  import { replace } from 'svelte-spa-router'
  import { askResetPassword } from '../lib/backend'

  let email = ''
  const isLoading = false

  async function handleOnSubmit () {
    await askResetPassword(email)
    replace('/sign-in')
  }

</script>

<style lang="scss">

  @use '../style/variables' as v;

  .btn {
    background-color: v.$clr-blue;
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
      border: solid 1px v.$clr-grey-light;
    }
  }

  .cancel {
    margin-top: 20px;
    text-align: center;
    a {
      color: v.$clr-blue;
      text-decoration: none;
    }
  }

</style>

<div class="container">

  <form on:submit|preventDefault={handleOnSubmit}>

    <div class="input">
      <input type="email" id="email" placeholder="Email" bind:value={email} required>
    </div>

    <div class="btn">
      <input type="submit" disabled={isLoading ? 'disabled' : ''} value="MOT DE PASSE OUBLIÉ"/>
      <Spinner class="spinner"/>
    </div>

    <div class="cancel">
      <a href="/#/sign-in">Annuler</a>
    </div>

  </form>

</div>
