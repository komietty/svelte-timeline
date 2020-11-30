<script lang='ts'>
import { getContext } from 'svelte';
import {current, paused, sc2px, tl_sc } from '../store';
import type { Tracks }     from '../store';
import type { ITrackable } from '../track';
export let px_w: number = document.body.clientWidth;
export let px_h: number = 300;
export let px_e: number = 300;
let tracks = getContext('tracks') as Tracks<ITrackable>;
const zoomin  = () => { $sc2px = $sc2px - 1; tracks.scale($sc2px); }
const zoomout = () => { $sc2px = $sc2px + 1; tracks.scale($sc2px); }
</script>

<div id="ctrler" style="--w:{px_w}px; --h:{px_h}px">
	<div id="curr">
		<span>{($current).toFixed(1)}sec</span>
	</div>
	<div id="btns">
		<button class="btn" on:click={() => $paused = !$paused}> <span>toggle play</span></button>
	</div>
	<div id="duration">
		<button on:click={() => zoomin()}  disabled={$tl_sc * ($sc2px - 1) < px_e}>zoom in </button>
		<button on:click={() => zoomout()} disabled={$sc2px > 9}>                  zoom out</button>
		<input bind:value={$tl_sc} min=10>
	</div>
</div>

<style>
#ctrler {
    display: flex;
    justify-content: space-between;
    width: var(--w);
    height: var(--h);
}
#ctrler #curr {
    width: 220px;
    padding: 0px 15px;
}
#ctrler #curr span {
    line-height: var(--h);
}
#ctrler #duration {
    width: 250px;
    margin: 20px 0;
}
#ctrler #duration button {
    width: 70px;
    height: 30px;
    font-size: 11px;
}
#ctrler #duration input {
    position: absolute;
    right: 15px;
	text-align: right;
    width: 70px;
	height: 30px;
}
#ctrler #btns {
    display: flex;
    justify-content: center;
}

#ctrler #btns .btn {
    background-color: white;
    margin: 17px 2px;
    padding: 0;
    width: 100px;
    height: 36px;
}

#ctrler #btns .btn span {
    line-height: 30px;
    font-size: 13px;
}
</style>