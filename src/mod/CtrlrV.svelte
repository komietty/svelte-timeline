<script lang='ts'>
import { getContext } from 'svelte';
import {current, paused, sc2px, tl_sc} from '../store';
import type { Tracks }     from '../store';
import type { ITrackable } from '../track';
export let px_w: number = 250;
export let px_h: number = 300;
export let px_e: number = 300;
const padding = 30;
let tracks = getContext('tracks') as Tracks<ITrackable>;
const zoomin  = () => { $sc2px = $sc2px - 1; tracks.scale(); }
const zoomout = () => { $sc2px = $sc2px + 1; tracks.scale(); }
</script>

<div id="ctrler" style="--w:{px_w}px; --h:{px_h}px; --p:{padding}px">
	<button id="btn" on:click={() => $paused = !$paused}> <span>toggle play</span></button>
	<input bind:value={$current}/>
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
    padding: var(--p);
    border-right: 1px solid #ddd;
    box-sizing: border-box;
}
#ctrler #duration button {
    display: block;
    width: 70px;
    height: 30px;
    font-size: 11px;
}
#ctrler #btn {
    background-color: white;
    padding: 0;
    width: 100px;
    height: 36px;
}
#ctrler #btn span {
    line-height: 30px;
    font-size: 13px;
}
input {
    display: block;
    text-align: right;
    width: 70px;
    height: 30px;
}
</style>