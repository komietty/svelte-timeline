<script lang="ts">
import { createEventDispatcher, getContext } from 'svelte';
import type { TrackAsset, ITrackable } from '../track';
import type { Tracks } from '../store';
import { focusedID, px2sc } from '../store';
import Menu from './Menu.svelte';
export let ta: TrackAsset<ITrackable>;
let tracks = getContext('tracks') as Tracks<ITrackable>;
let dsp = createEventDispatcher();
let pos = { x: 0, y: 0 };

const openMenu = async(e) => {
    dsp('closeMenu');
	if (ta.menu) await new Promise(res => setTimeout(res, 100));
	pos = { x: e.clientX, y: e.clientY };
	ta.menu = true;
}
</script>

<div class="m"
     class:selected={ta.uuid === $focusedID}
     style="margin-left:{ta.px_l}px; width:{ta.px_r - ta.px_l}px"
     draggable = "true"
     on:mousedown={() => $focusedID = ta.uuid}
     on:dragstart={e => ta.dragstart_trans(e)}
     on:drag={e => ta.dragmove_trans(e, $px2sc)}
     on:dragend={e => ta.dragmove_trans(e, $px2sc)}
     on:contextmenu|preventDefault={openMenu}>
     <slot/>
</div>

{#if ta.menu}
<Menu {...pos}
    on:clickoutside={e => ta.menu = false}
    on:deltrk={() => tracks.delete(ta)}/>
{/if}

<style>
.m {
    display: block;
    margin: 2px 0;
    cursor: move;
    position: relative;
    background-color: #e6e6e6;
    height: 30px;
    border-radius: 5px;
}
.m.selected {
    background-color: #ff0000;
    color: #ffffff;
}
</style>