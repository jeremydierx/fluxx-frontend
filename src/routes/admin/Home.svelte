<script>

  /**
   * Composant de la page d'accueil admin.
   *
   * @module Home
   *
   * @requires ../style/variables - Pour l'accès aux variables de style.
   *
   */

  import { signOut } from '../../lib/helpers'
</script>

<style lang="scss">

</style>

<h1>Admin home</h1>
<p><a on:click|preventDefault={signOut} href="/">Deconnexion</a></p>
