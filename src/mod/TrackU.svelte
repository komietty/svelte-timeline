<script lang="ts">
import { onMount } from 'svelte';
import { current, focusedID, px2sc } from '../store';
import type { TrackAsset, ITrackable } from '../track';

export let tla: TrackAsset<ITrackable>;
let l = 0;
let r = 0;
let name: string = tla.uid.toString();
let elm : HTMLElement;

onMount(() => {
    (function loop(){
        window.requestAnimationFrame(loop);
        tla.target.visible = tla.is_visible($current);
        l = tla.px_l;
        r = tla.px_r;
    })();
})
</script>

<div class="material"
     class:selected={tla.uid === $focusedID}
     style="margin-left:{l}px; width:{r-l}px"
     draggable = "true"
     bind:this={elm}
     on:mousedown={() => $focusedID = tla.uid}
     on:dragstart={e => tla.dragstart_trans(e)}
     on:drag={e => tla.dragmove_trans(e, $px2sc)}
     on:dragend={e => tla.dragmove_trans(e, $px2sc)}
     >
     <span class="scaler"
           style="left: 0"
           draggable="true"
           on:dragstart|stopPropagation={tla.dragstart_scale}
           on:drag|stopPropagation={e => tla.dragmove_scale_l(e, $px2sc)}
           on:dragenter|preventDefault|stopPropagation={() => false}
           on:dragover|preventDefault|stopPropagation={() => false}
           on:drop|preventDefault|stopPropagation={() => false}
           on:dragend|stopPropagation={e => tla.dragmove_scale_l(e, $px2sc)}
     ></span>
     <span id="name">{name}</span>
     <span class="scaler"
           style="right:0"
           draggable="true"
           on:dragstart|stopPropagation={tla.dragstart_scale}
           on:drag|stopPropagation={e => tla.dragmove_scale_r(e, $px2sc)}
           on:dragenter|preventDefault|stopPropagation={() => false}
           on:dragover|preventDefault|stopPropagation={() => false}
           on:drop|preventDefault|stopPropagation={() => false}
           on:dragend|stopPropagation={e => tla.dragmove_scale_r(e, $px2sc)}
     ></span>
</div>

<style>
.material {
    display: block;
    margin: 2px 0;
    cursor: move;
    position: relative;
    background-color: #e6e6e6;
    height: 30px;
    border-radius: 5px;
}
.material.selected {
    background-color: #ff0000;
    color: #ffffff;
}
.material #name {
    position: absolute;
    left: 10px;
    top: 3px;
}
.material .scaler {
    cursor: ew-resize;
    position: absolute;
    border-radius: 5px;
    width: 3px;
    margin: 3px;
    height: 24px;
    background-color: white;
}
</style>