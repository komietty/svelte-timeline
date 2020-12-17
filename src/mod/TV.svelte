<script lang="ts">
import { onMount } from "svelte";
import { current, paused, dragged, sc2px } from '../store';
import type { TrackAsset, ITrackable } from "../track";
export let ta: TrackAsset<ITrackable>;
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
    ta.px_l = 0;
    ta.px_r = width;
    ta.sc_l = 0;
    ta.sc_r = duration;
    ta.target.OnLoadHtmlElement(elm);
    _current = $current - ta.sc_l;
    elm.removeEventListener('canplay', onLoadVideo);
    (function loop(){
        window.requestAnimationFrame(loop);
        if($paused || !ta.visible) elm.pause();
        else if(_paused) elm.play();
        if(_dragged || $dragged) _current = $current - ta.sc_l; 
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
    <span>{ta.target.url}: {_paused ? "pausing":"playing"}</span>
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