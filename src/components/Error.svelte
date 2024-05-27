<script>
  import { mainError, showTimeoutInfo } from '../lib/store'
  import { onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'

  /**
   * SOUSCRIPTION AU STORE
   */
  let getMainError
  const unMainError = mainError.subscribe(value => { getMainError = value })

  /**
   * ERREUR
   */

  let timeout
  $: if (getMainError.error) {
    timeout = setTimeout(() => {
      cancelMainError()
    }, $showTimeoutInfo)
  }

  function cancelMainError () {
    mainError.set({ error: false, message: '' })
  }

  /**
   * CHARGEMENT/ DÉCHARGEMENT
   */

  onDestroy(() => {
    clearInterval(timeout)
    unMainError()
  })
</script>

<style lang="scss">

  @import '../style/variables';

  .error-content {
    width: 100%;
    position: fixed;
    top: $header-height;
    left: 0px;
    z-index: 100;
    padding: 1.2rem;
    text-align: center;
    border-radius: unset;
    border: none;
    margin: 0;
    height: $info-bar-height;
    line-height: $info-bar-height;
    background-color: $clr-red-error;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    color: $clr-red-error-dark;
    font-size: 1.3rem;
  }

</style>

{#if getMainError.error}
  <div class="error-content" transition:fade >
    <p>
      <b>{getMainError.message}</b>
    </p>
  </div>
{/if}
