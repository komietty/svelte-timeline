<script lang="ts">
import { onMount } from "svelte";
import { current, paused, dragged, focusedID, px2sc, sc2px } from '../store';
import type { TrackAsset, ITrackable } from "../track";

export let tla: TrackAsset<ITrackable>;
let elm:  HTMLVideoElement;
let name: string;
let mgnl = 0;
let _current = 0;
let _dragged = false;
let _paused  = true;
let duration = 300;
$: width = isNaN(duration)? 300 : duration * $sc2px;

onMount(() => {
    elm.src = tla.target.url;
    elm.addEventListener('canplay', onLoadVideo);
});

const onLoadVideo = () => {
    tla.px_l = 0;
    tla.px_r = width;
    tla.sc_l = 0;
    tla.sc_r = duration;
    tla.target.OnLoadHtmlElement(elm);
    elm.removeEventListener('canplay', onLoadVideo);

    (function loop(){
        window.requestAnimationFrame(loop);
        if($paused || !tla.is_visible($current)) elm.pause();
        else elm.play();
        if(_dragged || $dragged) _current = $current - tla.sc_l; 
        mgnl = tla.px_l;
    })();
}
</script>

<div class="material"
     class:selected={tla.uid === $focusedID}
     style="--mgn-l:{mgnl}px; --width:{width}px;"
     draggable = "true"
     on:mousedown={() => $focusedID = tla.uid}
     on:dragstart={e => {tla.dragstart_trans(e); _dragged = true;}}
     on:drag={e => {tla.dragmove_trans(e, $px2sc);}}
     on:dragend={e => {tla.dragmove_trans(e, $px2sc); _dragged = false;}}
     ><video loop id="v"
             style="display:none"
             bind:this={elm} 
             bind:currentTime={_current}
             bind:paused={_paused}
             bind:duration
             >
        <track kind="captions">
    </video>
	<span>{name}: {_paused ? "pausing":"playing"}</span>
</div>

<style>
.material {
    margin: 2px 0;
    margin-left: var(--mgn-l);
    width: var(--width);
    cursor: move;
    height: 30px;
    background-color: #e6e6e6;
    border-radius: 5px;
    overflow: hidden;
}
.material.selected {
    background-color: #ff0000;
    color: #ffffff;
}
.material span {
    margin: 0 10px;
    line-height: 30px;
}
</style>