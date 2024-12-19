<script>

  /**
   * Composant Success pour l'affichage d'un message de succès.
   *
   * @module Success
   *
   * @requires svelte - Pour l'utilisation des hooks de cycle de vie de Svelte et des transitions.
   * @requires ../lib/store - Pour l'accès au store de l'application.
   *
   * @property {Object} getMainSuccess - Les informations de succès à afficher.
   * @property {number} timeout - Le délai avant que le message de succès ne disparaisse.
   *
   * @function cancelMainSuccess - Annule l'affichage du message de succès.
   */

  import { mainSuccess, showTimeoutInfo } from '../lib/store'
  import { onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'

  /**
   * SOUSCRIPTION AU STORE
   */
  let getMainSuccess
  const unMainSuccess = mainSuccess.subscribe(value => { getMainSuccess = value })

  /**
   * SUCCESS
   */

  let timeout
  $: if (getMainSuccess.success) {
    timeout = setTimeout(() => {
      cancelMainSuccess()
    }, $showTimeoutInfo)
  }

  function cancelMainSuccess () {
    mainSuccess.set({ success: false, message: '' })
  }

  /**
   * CHARGEMENT / DÉCHARGEMENT
   */

  onDestroy(() => {
    clearInterval(timeout)
    unMainSuccess()
  })
</script>

<style lang="scss">

  @use '../style/variables' as v;

  .success-content {
    width: 100%;
    position: fixed;
    top: v.$header-height;
    left: 0px;
    z-index: 100;
    padding: 1.2rem;
    text-align: center;
    margin: 0;
    border: none;
    border-radius: unset;
    height: v.$info-bar-height;
    line-height: v.$info-bar-height;
    background-color: v.$clr-green-success;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    color: v.$clr-green-success-dark;
    font-size: 1.3rem;
  }

</style>

{#if getMainSuccess.success}
  <div class="success-content" transition:fade >
    <p>
      <b>{getMainSuccess.message}</b>
    </p>
  </div>
{/if}
