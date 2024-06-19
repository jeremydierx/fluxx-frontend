<script>

  import { signOut } from '../../lib/helpers'
  import { userAuthState } from '../../lib/store'

</script>

<style lang="scss">

</style>
<h1>Menu</h1>
<ul>
  {#if $userAuthState.isAuth }
    <li><a href="/#/admin">Accueil</a></li>
    <li><a href="/#/admin/my-account">Mon compte</a></li>
    <li><a on:click|preventDefault={signOut} href="/">Deconnexion</a></li>
  {:else}
  <li><a href="/">Accueil</a></li>
    <li><a href="/sign-in">Connexion</a></li>
  {/if}
</ul>
