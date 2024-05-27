<script>

import { isLoading } from '../lib/store'

  /**
   * PROPS
   */

  export let type = 'default'
  export let size = '15'
  export let color = 'black'
  export let forceLoading = false

  let svgColor

  $: switch (color) {
  case 'white':
    svgColor = '#ffffff'
    break
  case 'black':
    svgColor = '#000000'
    break
  default:
    svgColor = '#000000'
  }
</script>

<style>
  svg {
    background-color: transparent !important;
    line-height: 1;
    vertical-align: -0.125em;
  }
</style>

{#if $isLoading || forceLoading}
  {#if type === 'default'}
    <svg style="width: {size}px;" class={$$props.class} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{size}" height="{size}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="rotate(180 50 50)">
        <rect x="15" y="15" width="10" height="{size}" fill="{svgColor}">
          <animate attributeName="height" values="50;70;30;50" keyTimes="0;0.33;0.66;1" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.4s"></animate>
        </rect>
        <rect x="35" y="15" width="10" height="{size}" fill="{svgColor}">
          <animate attributeName="height" values="50;70;30;50" keyTimes="0;0.33;0.66;1" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.2s"></animate>
        </rect>
        <rect x="55" y="15" width="10" height="{size}" fill="{svgColor}">
          <animate attributeName="height" values="50;70;30;50" keyTimes="0;0.33;0.66;1" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.6s"></animate>
        </rect>
        <rect x="75" y="15" width="10" height="{size}" fill="{svgColor}">
          <animate attributeName="height" values="50;70;30;50" keyTimes="0;0.33;0.66;1" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" begin="-1s"></animate>
        </rect>
      </g>
    </svg>
  {/if}
{/if}
