<script lang="ts">
import { onMount } from "svelte";
import { current, paused, dragged, sc2px } from '../store';
import type { TrackAsset, ITrackable } from "../track";
export let ta: TrackAsset<ITrackable>;
export let debug = false;
let elm: HTMLVideoElement;
let _current = 0;
let _dragged = false;
let _paused  = true;
let duration = 3;
$: width = isNaN(duration)? 300 : duration * $sc2px;

onMount(() => {
    elm.src = ta.target.url;
    elm.addEventListener('canplay', onLoadVideo);
});

const onLoadVideo = () => {
    ta.px_r = ta.px_l + width;
    ta.sc_r = ta.sc_l + duration;
    ta.target.OnLoadHtmlElement(elm);
    _current = $current - ta.sc_l;
    elm.removeEventListener('canplay', onLoadVideo);
    (function loop(){
        const r = window.requestAnimationFrame(loop);
        if(!elm) window.cancelAnimationFrame(r);
        else {
            if($paused || !ta.visible) elm.pause();
            else if(_paused) elm.play();
            if(_dragged || $dragged) _current = $current - ta.sc_l; 
        }
    })();
}
</script>

<video loop id="v"
       style="display:none"
       bind:this={elm} 
       bind:currentTime={_current}
       bind:paused={_paused}
       bind:duration>
    <track kind="captions">
</video>
<div>
    <span>{ta.name}</span>
    {#if debug}
    <span>{ta.uuid.toString().slice(0, 5)}</span>
    <span>{ta.visible}</span>
    <span>{ta.order}</span>
    <span>{ta.target.url}: {_paused ? "pausing":"playing"}</span>
    {/if}
</div>

<style>
div {
    width: calc(100% - 20px);
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    margin-left: 10px;
    display: inline-block;
    overflow: hidden;
}
</style>