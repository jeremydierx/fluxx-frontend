<script>

  /**
   * Composant de la page Mon compte.
   *
   * @module MyAccount
   *
   * @requires ../../lib/store - Pour l'accès au store de l'application.
   * @requires ../../lib/backend - Pour l'interaction avec le backend.
   * @requires svelte - Pour l'utilisation des hooks de cycle de vie de Svelte.
   * @requires ../../components/Spinner.svelte - Composant pour l'affichage d'un spinner de chargement.
   *
   * @property {Object} user - Les informations de l'utilisateur.
   * @property {boolean} isLoading - Indique si une requête est en cours.
   *
   * @function getMyAccount - Récupère les informations du compte de l'utilisateur actuellement authentifié.
   */

  import { userAuthState } from '../../lib/store'
  import {
    getUser,
    updateUser
  } from '../../lib/backend'
  import {
    onMount,
    onDestroy
  } from 'svelte'
  import Spinner from '../../components/Spinner.svelte'

  let user = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }
  let isLoading = false

  async function getMyAccount () {
    isLoading = true
    const data = await getUser($userAuthState.user.id)
    if (!data.error) {
      user = data.user
      isLoading = false
    }
  }

  /**
   * Met à jour les informations de l'utilisateur.
   * Récupère les données du formulaire, les convertit en un objet et les affiche dans la console.
   *
   * @function updateUser
   * @param {Event} event - L'événement déclenché par le formulaire.
   * @returns {void} Ne renvoie rien.
   */
  async function updateMyAccount (event) {
    isLoading = true
    const form = event.target
    const formData = new FormData(form)
    const updatedUser = Object.fromEntries(formData)
    updatedUser.id = $userAuthState.user.id
    await updateUser(updatedUser)
    isLoading = false
  }

  /**
   * Exécuté lors du montage du composant.
   * Si un ID est fourni dans les paramètres, récupère les informations du compte de l'utilisateur.
   *
   * @async
   * @function onMount
   * @returns {Promise<void>} Ne renvoie rien.
   * @throws {Error} Si une erreur se produit lors de la récupération des données.
   */
  onMount(async () => {
    if ($userAuthState.user.id) await getMyAccount()
  })

  /**
   * Exécuté lors de la destruction du composant.
   * Réinitialise l'objet user.
   *
   * @function onDestroy
   * @returns {void} Ne renvoie rien.
   */
  onDestroy(() => {
    user = null
  })

</script>

<style lang="scss">

  @import '../../style/variables';

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

  .section {
    margin-bottom: 20px;;
    label, input {
      display: block;
      width: 100%;
    }
    label {
      color: $clr-grey;
    }
    input {
      padding: 5px;
      border : 1px solid $clr-grey-light;
    }
  }

</style>

<h1>Mon compte</h1>

<form on:submit|preventDefault={updateMyAccount}>

  <div class="section">
    <label for="firstname">Nom</label>
    <input type="text" id="firstname" name="firstname" bind:value={user.firstname} />
  </div>

  <div class="section">
    <label for="lastname">Prénom</label>
    <input type="text" id="lastname" name="lastname" bind:value={user.lastname} />
  </div>

  <div class="section">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" bind:value={user.email} />
  </div>

  <div class="section">
    <label for="password">Nouveau mot de passe</label>
    <input type="password" id="password" name="password" minlength="8" />
  </div>

  <div class="btn">
    <input type="submit" disabled={isLoading ? 'disabled' : ''} value="ENREGISTRER"/>
    <Spinner class="spinner"/>
  </div>

</form>
