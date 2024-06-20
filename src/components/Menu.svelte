<script>

  /**
   * Composant du menu de navigation.
   *
   * @module Menu
   *
   * @requires ../lib/helpers - Pour l'accès à la fonction signOut.
   * @requires ../lib/store - Pour l'accès au store de l'application.
   *
   * @property {Object} userAuthState - Le store d'authentification de l'utilisateur.
   */

  import { signOut } from '../lib/helpers'
  import { userAuthState } from '../lib/store'

</script>

<style lang="scss">

  @import '../style/variables';

  [class^="icon-"] {
    margin-right: 5px;
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

</style>
<h1>Menu</h1>
<ul>
  {#if $userAuthState.isAuth }
    <li><span class="icon-house-door"></span><a href="/#/admin">Accueil</a></li>
    <li><span class="icon-person"></span><a href="/#/admin/my-account">Mon compte</a></li>
    <li><span class="icon-power"></span><a on:click|preventDefault={signOut} href="/">Deconnexion</a></li>
  {:else}
  <li><span class="icon-house-door"></span><a href="/">Accueil</a></li>
    <li><span class="icon-power"></span><a href="/#/sign-in">Connexion</a></li>
  {/if}
</ul>
