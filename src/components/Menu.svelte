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

  @use '../style/variables' as v;

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

</style>
<h1>Menu</h1>
<ul>
  {#if $userAuthState.isAuth }
    <li>
      <div class="text-with-icon">
        <div class="icon">
          <i class="bi-house-door"></i>
        </div>
        <div class="text">
          <span><a href="/#/admin">Accueil</a></span>
        </div>
      </div>
    <li>
      <div class="text-with-icon">
        <div class="icon">
          <i class="bi-person"></i>
        </div>
        <div class="text">
          <span><a href="/#/admin/my-account">Mon compte</a></span>
        </div>
      </div>
    </li>
    <li>
      <div class="text-with-icon">
        <div class="icon">
          <i class="bi-box-arrow-right"></i>
        </div>
        <div class="text">
          <span><a on:click|preventDefault={signOut} href="/">Deconnexion</a></span>
        </div>
      </div>
    </li>
  {:else}
    <li>
      <div class="text-with-icon">
        <div class="icon">
          <i class="bi-house-door"></i>
        </div>
        <div class="text">
          <span><a href="/">Accueil</a></span>
        </div>
      </div>
    </li>
    <li>
      <div class="text-with-icon">
        <div class="icon">
          <i class="bi-box-arrow-in-right"></i>
        </div>
        <div class="text">
          <span><a href="/#/sign-in">Connexion</a></span>
        </div>
      </div>
    </li>
  {/if}
</ul>
