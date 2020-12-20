<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { fade } from 'svelte/transition';
export let n: string;
export let x: number;
export let y: number;
let elm;
let dsp = createEventDispatcher();
const hide = (e) => { if (e.target !== elm && !elm.contains(e.target)) dsp('clickoutside'); }
const del  = (e) => { dsp('deltrk'); }
const rnm  = (n: string) => { dsp('rename', {name: n}); }

$: ((x, y) => {
	if (!elm) return;
	const r = elm.getBoundingClientRect();
	x = Math.min(window.innerWidth - r.width, x);
	if (y > window.innerHeight - r.height) y -= r.height;
})(x, y);

const rename = (e) => {
    if (e.keyCode === 13) rnm(n);
}
</script>

<svelte:body on:click={hide}/>
<div transition:fade={{ duration: 100 }} bind:this={elm} style="top:{y}px; left:{x}px;">
    <input bind:value={n} type="text" name="" id="" on:keyup={rename}>
    <p id='bdr'></p>
    <p id='del' on:click={del}>delete track</p>
</div>

<style>
div {
    position: fixed;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 5px;
    z-index: 100;
    width: 150px;
    font-size: 12px;
}
input {
    width: 130px;
    height: 25px;
    margin-top: 5px;
    margin-left: 8px;
    padding-bottom: 5px;
}
#bdr {
    margin: 0;
    width: 150px;
    border-bottom: 1px solid #ddd;
}
#del {
    margin: 0;
    line-height: 30px;
    padding-left: 10px;
}
p:hover { background-color: #eee; }
</style>