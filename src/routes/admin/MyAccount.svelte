<script>

  import Menu from '../../components/admin/Menu.svelte'
  import { userAuthState } from '../../lib/store'
  import { getUser } from '../../lib/backend'
  import {
    onMount,
    onDestroy
  } from 'svelte'

  let user = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }

  /**
 * Récupère les informations du compte de l'utilisateur actuellement authentifié.
 * Utilise la fonction getUser pour obtenir les informations de l'utilisateur à partir de l'API backend.
 * Met à jour l'état de l'utilisateur si aucune erreur n'est renvoyée.
 *
 * @async
 * @function getMyAccount
 * @returns {Promise<void>} Ne renvoie rien.
 * @throws {Error} Si une erreur se produit lors de la récupération des données.
 */
  async function getMyAccount () {
    const data = await getUser($userAuthState.user.id)
    if (!data.error) user = data.user
  }

  /**
   * Met à jour les informations de l'utilisateur.
   * Récupère les données du formulaire, les convertit en un objet et les affiche dans la console.
   *
   * @function updateUser
   * @param {Event} event - L'événement déclenché par le formulaire.
   * @returns {void} Ne renvoie rien.
   */
  function updateUser (event) {
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    console.log(data)
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

</style>

<Menu />

<h1>Mon compte</h1>

<form on:submit|preventDefault={updateUser}>

  <div>
    <label for="firstname">Nom</label>
    <input type="text" id="firstname" name="firstname" bind:value={user.firstname} />
  </div>

  <div>
    <label for="lastname">Prénom</label>
    <input type="text" id="lastname" name="lastname" bind:value={user.lastname} />
  </div>

  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" bind:value={user.email} />
  </div>

  <div>
    <label for="password">Mot de passe</label>
    <input type="password" id="password" name="password" />
  </div>

  <div>
    <button type="submit">Enregistrer</button>
  </div>

</form>
