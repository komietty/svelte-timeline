<script lang="ts">
import { onMount } from "svelte";
import { current, paused, dragged, focusedID, px2sc, sc2px } from '../store';
import type { TrackAsset, ITrackable } from "../track";

export let ta: TrackAsset<ITrackable>;
let elm:  HTMLVideoElement;
let name: string;
let _current = 0;
let _dragged = false;
let _paused  = true;
let duration = 3;
$: width = isNaN(duration)? 300 : duration * $sc2px;

onMount(() => {
    elm.src = ta.target.url;
    console.log(ta.target.url)
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

<div class="m"
     class:selected={ta.uuid === $focusedID}
     style="--mgn-l:{ta.px_l}px; --width:{width}px;"
     draggable = "true"
     on:mousedown={() => $focusedID = ta.uuid}
     on:dragstart={e => {ta.dragstart_trans(e); _dragged = true;}}
     on:drag={e => {ta.dragmove_trans(e, $px2sc);}}
     on:dragend={e => {ta.dragmove_trans(e, $px2sc); _dragged = false;}}>
     <video loop id="v"
             style="display:none"
             bind:this={elm} 
             bind:currentTime={_current}
             bind:paused={_paused}
             bind:duration
             >
        <track kind="captions">
    </video>
	<span>{ta.target.url}: {_paused ? "pausing":"playing"}</span>
</div>

<style>
.m {
    margin: 2px 0;
    margin-left: var(--mgn-l);
    width: var(--width);
    cursor: move;
    height: 30px;
    background-color: #e6e6e6;
    border-radius: 5px;
    overflow: hidden;
}
.m.selected {
    background-color: #ff0000;
    color: #ffffff;
}
.m span {
    margin: 0 10px;
    line-height: 30px;
    font-size: 12px;
    line-height: 30px;
}
</style>