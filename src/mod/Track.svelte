<script lang="ts">
import { createEventDispatcher, getContext } from 'svelte';
import type { TrackAsset, ITrackable } from '../track';
import type { Style }  from '../style';
import type { Tracks } from '../store';
import { focusedID } from '../store';
import Menu from './Menu.svelte';
export let ta: TrackAsset<ITrackable>;
let tracks = getContext('tracks') as Tracks<ITrackable>;
let styles = getContext('styles') as Style;
let dsp = createEventDispatcher();
let prm = {n: ta.name, x: 0, y: 0 };

const openMenu = async(e) => {
    dsp('closeMenu');
	if (ta.menu) await new Promise(res => setTimeout(res, 100));
	prm = {n: ta.name, x: e.clientX, y: e.clientY };
	ta.menu = true;
}
</script>

<div class="m"
     class:selected={ta.uuid === $focusedID}
     style="margin-left:{ta.px_l}px; width:{ta.px_r - ta.px_l}px; --b:{styles.base_col}; --s:{styles.slct_col}; --bt:{styles.base_txt}; --st:{styles.slct_txt};"
     draggable = "true"
     on:mousedown={() => $focusedID = ta.uuid}
     on:dragstart={e => ta.dragbgn_trans(e)}
     on:drag={e => ta.dragmov_trans(e)}
     on:dragend={e => ta.dragfin_trans(e)}
     on:contextmenu|preventDefault={openMenu}>
     <slot/>
</div>

{#if ta.menu}
<Menu {...prm} 
    on:clickoutside={e => ta.menu = false}
    on:deltrk={e => tracks.delete(ta)}
    on:rename={e => tracks.rename(ta, e.detail.name)}
    />
{/if}

<style>
.m {
    display: block;
    margin: 2px 0;
    cursor: move;
    position: relative;
    background-color: var(--b);
    height: 30px;
    border-radius: 5px;
    color: var(--bt);
}
.m.selected {
    background-color: var(--s);
    color: var(--st);
}
</style>