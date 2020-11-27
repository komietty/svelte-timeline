<script lang='ts'>
    import {current, paused, sc2px, tl_sc} from '../store';
    export let px_w: number = 250;
    export let px_h: number = 300;
    const padding = 30;
    $: curr = ($current).toFixed(1);
</script>

<div id="ctrler" style="--w:{px_w}px; --h:{px_h}px; --p:{padding}px">
	<button id="btn" on:click={() => $paused = !$paused}> <span>toggle play</span></button>
	<input bind:value={$current}/>
	<div id="duration">
		<button on:click={() => $sc2px = $sc2px - 1} disabled={$tl_sc * ($sc2px - 1) < document.body.clientWidth}>zoom in </button>
		<button on:click={() => $sc2px = $sc2px + 1} disabled={$sc2px > 9}>                                       zoom out</button>
		<input bind:value={$tl_sc} min=10>
	</div>
</div>

<style>
#ctrler {
    width: var(--w);
    height: var(--h);
    padding: var(--p);
    border: 1px solid #ddd;
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