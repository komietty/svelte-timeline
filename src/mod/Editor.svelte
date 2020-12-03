<script lang="ts">
import { getContext } from 'svelte';
import Track from './Track.svelte'
import TU from './TU.svelte'
import TV from './TV.svelte'
import { current, normcur, dragged, px2sc, tl_sc, tl_px, sc2px } from '../store';
import type { Tracks }     from '../store';
import type { ITrackable } from '../track';
import { get } from 'svelte/store';

let prv: number;
let tracks = getContext('tracks') as Tracks<ITrackable>;
export let w: number = document.body.clientWidth;
export let h: number = 300;
export let x: number = 0;
export let v: boolean = true;
$: measure = new Array(parseFloat($tl_sc.toString()) / 10);

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

const closeMenu = () => { get(tracks).forEach(t => t.menu = false); }
</script>

<div id="e" class:float={v} style="--w:{w}px; --h:{h}px; --x:{x}px">
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
        <div id="measure" style="--space:{$sc2px}">
            {#each measure as _, i}
            {#if i % 6 === 0}
            <span class="min"/>
            {:else}
            <span class="sec"/>
            {/if}
            {/each}
        </div>
        <div id="tracks">
            <ul style="list-style:none; padding: 0">
                {#each $tracks as t, i (t.uuid)}
                    <li draggable="true"
                        style="border-bottom: 1px solid #eeeeee"
                        on:dragstart={e => flip_str(e, i)}
                        on:dragover|preventDefault={() => false}
                        on:drop|preventDefault={e => flip_fin(e, i)}>
                        {#if      t.type === 'video'} <Track ta={t}><TV ta={t}/></Track>
                        {:else if t.type === 'utils'} <Track ta={t} on:closeMenu={closeMenu}><TU ta={t}/></Track>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<style>
#e {
    width: var(--w);
    height: var(--h);
    display: block;
    position: relative;
    border-top: 1px solid #e6e6e6;
    box-sizing: border-box;
    overflow-x: auto;
    cursor: col-resize;
}

#e::-webkit-scrollbar {
    display: none;
}

#e.float {
    position: absolute;
    top: 0;
    left: var(--x);
}

#e #current {
    width: 10px;
    height: var(--h);
    z-index: 100;
    position: absolute;
    top: 0;
    left: var(--l);
}

#e #current #top {
    position: absolute;
    width: 100%;
    height: 15px;
    background-color: red;
}

#e #current #seg {
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: red;
}

#e #inner {
    width: var(--duration);
    height: var(--h);
}

#e #inner #measure {
    height: 20px;
}
#e #inner #measure span {
    margin-right: calc(10px * var(--space) - 2px);
    display: inline-block;
    vertical-align: top;
    width: 2px;
}

#e #inner #measure .min {
    height: 15px;
    background-color:red;
}

#e #inner #measure .sec {
    height: 10px;
    background-color: #e6e6e6;
}

#e #inner #tracks {
    overflow-x: hidden;
}
</style>