<script lang="ts">
import type { TrackAsset, ITrackable } from '../track';
import { px2sc } from '../store';
export let ta: TrackAsset<ITrackable>;
</script>

<span class="scaler"
       style="left:0"
       draggable="true"
       on:dragstart|stopPropagation={e => ta.dragbgn_scale(e)}
       on:drag|stopPropagation={e => ta.dragmov_scale_l(e)}
       on:dragenter|preventDefault|stopPropagation={() => false}
       on:dragover|preventDefault|stopPropagation={() => false}
       on:drop|preventDefault|stopPropagation={() => false}
       on:dragend|stopPropagation={e => ta.dragfin_scale_l(e)}/>
<div id="info">
    <span>{ta.name}</span>
    <span>{ta.uuid.toString().slice(0, 5)}</span>
    <span>{ta.visible}</span>
    <span>{ta.order}</span>
</div>
<span class="scaler"
       style="right:0"
       draggable="true"
       on:dragstart|stopPropagation={e => ta.dragbgn_scale(e)}
       on:drag|stopPropagation={e => ta.dragmov_scale_r(e)}
       on:dragenter|preventDefault|stopPropagation={() => false}
       on:dragover|preventDefault|stopPropagation={() => false}
       on:drop|preventDefault|stopPropagation={() => false}
       on:dragend|stopPropagation={e => ta.dragfin_scale_r(e)}/>

<style>
#info {
    width: calc(100% - 30px);
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    margin-left: 15px;
    display: inline-block;
    overflow: hidden;
}
.scaler {
    cursor: ew-resize;
    position: absolute;
    border-radius: 5px;
    width: 3px;
    margin: 3px;
    height: 24px;
    background-color: white;
}
</style>