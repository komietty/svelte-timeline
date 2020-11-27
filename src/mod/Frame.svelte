<script lang='ts'>
import { onMount, getContext } from "svelte";
import CtrlrH from "./CtrlrH.svelte";
import CtrlrV from "./CtrlrV.svelte";
import Editor from "./Editor.svelte";
import { current, recording, paused } from '../store';
import type { Tracks } from '../store';
import type { ITrackable } from '../track';

export let px_w = document.body.clientWidth;
export let px_h = 300;
export let v = true;
const vw = 170;
const hh = 70;
const tracks = getContext('tracks') as Tracks<ITrackable>;
$: e_px_x = v ? vw : 0;
$: e_px_w = v ? px_w - vw : px_w;
$: e_px_h = v ? px_h : px_h - hh;

onMount(() => {
    let prv = performance.now();
    (function tick(){
    	requestAnimationFrame(tick);
    	if(!$recording){
    		tracks.tick();
    		$current += ($paused ? 0 : (performance.now() - prv) * 0.001);
    		prv = performance.now();
    	}
    })();
})
</script>

<div id="tl" style="--w:{px_w}px; --h:{px_h}px;">
    {#if v} <CtrlrV px_w={vw} px_h={px_h}/>
    {:else} <CtrlrH px_w={px_w} px_h={hh}/>
    {/if}
    <Editor w={e_px_w} h={e_px_h} x={e_px_x} v={v}/>
</div>

<style>
#tl {
    --w: 300px;
    --h: 300px;
    display: block;
    position: relative;
    width: var(--w);
    height: var(--h);
}
</style>
