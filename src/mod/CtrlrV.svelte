<script lang='ts'>
import { getContext } from 'svelte';
import {current, paused, sc2px, tl_sc} from '../store';
import { bcgd_col, slct_col, base_txt, slct_txt } from '../style';
import type { Tracks }     from '../store';
import type { ITrackable } from '../track';
export let px_w: number = 250;
export let px_h: number = 300;
export let px_e: number = 300;
let tracks = getContext('tracks') as Tracks<ITrackable>;
const zoomin  = () => { $sc2px = $sc2px - 1; tracks.scale(); }
const zoomout = () => { $sc2px = $sc2px + 1; tracks.scale(); }
</script>

<div id="ctrler" style="--w:{px_w}px; --h:{px_h}px; --b:{bcgd_col}; --s:{slct_col}; --bt:{base_txt}; --st:{slct_txt};">
    <button id="btn" class:paused={$paused} on:click={() => $paused = !$paused}>
        {#if $paused} <span>play </span>
        {:else}       <span>pause</span>
        {/if}
    </button>
	<div id="curr">
		<span>{($current).toFixed(1)} sec</span>
	</div>
	<div id="duration">
		<button on:click={() => zoomin()}  disabled={$tl_sc * ($sc2px - 1) < px_e}>zoom in </button>
		<button on:click={() => zoomout()} disabled={$sc2px > 9}>                  zoom out</button>
		<input bind:value={$tl_sc} min=10>
	</div>
</div>

<style>
#ctrler {

    width: var(--w);
    height: var(--h);
    padding: 50px 30px;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
}
#ctrler #duration button {
    display: block;
    width: 70px;
    height: 30px;
    font-size: 11px;
    margin-left: 30px;
}
#ctrler #btn {
    background-color: var(--s);
    border: solid 1px var(--s);
    padding: 0;
    width: 100px;
    height: 36px;
    margin-bottom: 30px;
}
#ctrler #btn span {
    color: var(--st);
    line-height: 30px;
    font-size: 13px;
}
#ctrler #btn.paused {
    background-color: var(--b);
    border: solid 1px var(--s);
    padding: 0;
    width: 100px;
    height: 36px;
    margin-bottom: 30px;
}
#ctrler #btn.paused span {
    color: var(--s);
    line-height: 30px;
    font-size: 13px;
}
input, #curr {
    display: block;
    text-align: right;
    width: 70px;
    margin-left: 30px;
    height: 30px;
}
</style>