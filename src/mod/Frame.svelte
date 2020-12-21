<script lang='ts'>
import { onMount, setContext } from "svelte";
import { current, recording, paused } from '../store';
import { Style } from '../style';
import type { Tracks }     from '../store';
import type { ITrackable } from '../track';
import CtrlrH from "./CtrlrH.svelte";
import CtrlrV from "./CtrlrV.svelte";
import Editor from "./Editor.svelte";

export let px_w = document.body.clientWidth;
export let px_h = 300;
export let tracks: Tracks<ITrackable>;
export let styles: Style = new Style();

const vw = 160;
const hh = 70;
setContext('tracks', tracks);
setContext('styles', styles);
$: e_px_x = styles.vertical ? vw : 0;
$: e_px_w = styles.vertical ? px_w - vw : px_w;
$: e_px_h = styles.vertical ? px_h : px_h - hh;

onMount(() => {
    let prv = performance.now();
    (function tick(){
    	requestAnimationFrame(tick);
    	if(!$recording){
    		$current += ($paused ? 0 : (performance.now() - prv) * 0.001);
    		prv = performance.now();
    		tracks.tick($current);
    	}
    })();
})
</script>

<div id="tl" style="--w:{px_w}px; --h:{px_h}px; --b:{styles.bcgd_col}">
    {#if styles.vertical} <CtrlrV px_w={vw} px_h={px_h} px_e={e_px_w}/>
    {:else}               <CtrlrH px_w={px_w} px_h={hh}/>
    {/if}
    <Editor w={e_px_w} h={e_px_h} x={e_px_x}/>
</div>

<style>
#tl {
    display: block;
    background-color: var(--b);
    position: relative;
    width: var(--w);
    height: var(--h);
}
</style>
