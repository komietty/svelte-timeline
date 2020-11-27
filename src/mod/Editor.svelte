<script lang="ts">
import { getContext } from 'svelte';
import TrackV from './TrackV.svelte'
import TrackU from './TrackU.svelte'
import { current, normcur, dragged, px2sc, tl_sc, tl_px } from '../store';
import type { Tracks }     from '../store';
import type { ITrackable } from '../track';

let prv: number;
let tracks = getContext('tracks') as Tracks<ITrackable>;
export let w: number = document.body.clientWidth;
export let h: number = 300;
export let x: number = 0;
export let v: boolean = true;
$: measure = Array(parseFloat($tl_sc.toString()));

const dragstr_curr = e => { prv = e.pageX; e.dataTransfer.setDragImage(new Image(), 0, 0); dragged.set(true);}
const dragmov_curr = e => { $current += (e.pageX - prv) * $px2sc; prv = e.pageX; }
const dragend_curr = e => { $current += (e.pageX - prv) * $px2sc; prv = e.pageX; dragged.set(false);}

const flip_str = (e, i) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('id', i);
}
const flip_fin = (e, tgt) => {
    e.dataTransfer.dropEffect = 'move';
    const id = e.dataTransfer.getData('id');
    if(id) tracks.flip(parseInt(id), tgt);
}
</script>

<div id="timeline-editor" class:float={v} style="--w:{w}px; --h:{h}px; --x:{x}px">
    <div id="current"
         draggable="true"
         on:dragstart|stopPropagation={dragstr_curr}
         on:drag|preventDefault={dragmov_curr}
         on:dragenter|preventDefault|stopPropagation={() => false}
         on:dragover|preventDefault|stopPropagation={() => false}
         on:drop|preventDefault|stopPropagation={() => false}
         on:dragend|preventDefault|stopPropagation={dragend_curr}
         style="--l:{$normcur}px">
        <span id='top'/>
        <span id='seg'/>
    </div>
    <div id="inner" style="--duration:{$tl_px}px">
        <div id="measure">
            {#each measure as _, i}
            {#if i%60 === 0}      <span style="height:20px; background-color:red"/>
            {:else if i%10 === 0} <span style="height:20px;"/>
            {:else}               <span style="height:10px;"/>
            {/if}
            {/each}
        </div>
        <div id="tracks">
            <ul style="list-style:none; padding: 0">
                {#each $tracks as t, i (t.uid)}
                    <li draggable="true"
                        style="border-bottom: 1px solid #eeeeee"
                        on:dragstart={e => flip_str(e, i)}
                        on:dragover|preventDefault={() => false}
                        on:drop|preventDefault={e => flip_fin(e, i)}>
                        {#if      t.type === 'video'} <TrackV tla={t}/>
                        {:else if t.type === 'utils'} <TrackU tla={t}/>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<style>
#timeline-editor {
    width: var(--w);
    height: var(--h);
    display: block;
    border-top: 1.5px solid #e6e6e6;
    overflow-x: auto;
    cursor: col-resize;
}

#timeline-editor::-webkit-scrollbar {
    display: none;
}

#timeline-editor.float {
    position: absolute;
    top: 0;
    left: var(--x);
}

#timeline-editor #current {
    width: 10px;
    height: var(--h);
    z-index: 100;
    position: absolute;
    top: 0;
    left: var(--l);
}

#timeline-editor #current #top {
    position: absolute;
    width: 100%;
    height: 15px;
    background-color: red;
}

#timeline-editor #current #seg {
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: red;
}

#timeline-editor #inner {
    width: var(--duration);
    height: var(--h);
}

#timeline-editor #inner #measure {
    height: 22px;
    display: flex;
    justify-content: space-between;
}

#timeline-editor #inner #measure span {
    width: 1.5px;
    background-color: #e6e6e6;
}

#timeline-editor #inner #tracks {
    overflow-x: hidden;
}
</style>