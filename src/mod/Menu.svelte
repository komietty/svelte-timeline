<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { fade } from 'svelte/transition';
export let x;
export let y;
let elm;
let dsp = createEventDispatcher();
const hide = e => { if (e.target !== elm && !elm.contains(e.target)) dsp('clickoutside'); }
const del  = e => { dsp('deltrk'); }

$: ((x, y) => {
	if (!elm) return;
	const r = elm.getBoundingClientRect();
	x = Math.min(window.innerWidth - r.width, x);
	if (y > window.innerHeight - r.height) y -= r.height;
})(x, y);
</script>

<svelte:body on:click={hide}/>
<div transition:fade={{ duration: 100 }} bind:this={elm} style="top:{y}px; left:{x}px;">
    <p on:click={del}>delete track</p>
</div>

<style>
div {
    position: fixed;
    border: 1px solid #eee;
    background-color: white;
    border-radius: 5px;
    z-index: 100;
    width: 120px;
}
p {
    font-size: 12px;
    margin: 0;
    line-height: 30px;
    padding-left: 10px;
}
p:hover { background-color: #eee; }
</style>