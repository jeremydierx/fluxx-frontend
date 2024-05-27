<script>
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

  @import '../style/variables';

  .success-content {
    width: 100%;
    position: fixed;
    top: $header-height;
    left: 0px;
    z-index: 100;
    padding: 1.2rem;
    text-align: center;
    margin: 0;
    border: none;
    border-radius: unset;
    height: $info-bar-height;
    line-height: $info-bar-height;
    background-color: $clr-green-success;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    color: $clr-green-success-dark;
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
