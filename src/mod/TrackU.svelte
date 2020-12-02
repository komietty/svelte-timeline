<script lang="ts">
import { focusedID, px2sc } from '../store';
import type { TrackAsset, ITrackable } from '../track';
export let ta: TrackAsset<ITrackable>;
</script>

<div class="m"
     class:selected={ta.uuid === $focusedID}
     style="margin-left:{ta.px_l}px; width:{ta.px_r - ta.px_l}px"
     draggable = "true"
     on:mousedown={() => $focusedID = ta.uuid}
     on:dragstart={e => ta.dragstart_trans(e)}
     on:drag={e => ta.dragmove_trans(e, $px2sc)}
     on:dragend={e => ta.dragmove_trans(e, $px2sc)}
     >
     <span class="scaler"
           style="left: 0"
           draggable="true"
           on:dragstart|stopPropagation={ta.dragstart_scale}
           on:drag|stopPropagation={e => ta.dragmove_scale_l(e, $px2sc)}
           on:dragenter|preventDefault|stopPropagation={() => false}
           on:dragover|preventDefault|stopPropagation={() => false}
           on:drop|preventDefault|stopPropagation={() => false}
           on:dragend|stopPropagation={e => ta.dragmove_scale_l(e, $px2sc)}></span>
    <div id="info">
        <span>{ta.name}</span>
        <span>{ta.uuid.toString().slice(0, 5)}</span>
        <span>{ta.visible}</span>
    </div>
    <span class="scaler"
           style="right:0"
           draggable="true"
           on:dragstart|stopPropagation={ta.dragstart_scale}
           on:drag|stopPropagation={e => ta.dragmove_scale_r(e, $px2sc)}
           on:dragenter|preventDefault|stopPropagation={() => false}
           on:dragover|preventDefault|stopPropagation={() => false}
           on:drop|preventDefault|stopPropagation={() => false}
           on:dragend|stopPropagation={e => ta.dragmove_scale_r(e, $px2sc)}></span>
</div>

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
.m #info {
    width: calc(100% - 30px);
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    margin-left: 15px;
    display: inline-block;
    overflow: hidden;
}
.m .scaler {
    cursor: ew-resize;
    position: absolute;
    border-radius: 5px;
    width: 3px;
    margin: 3px;
    height: 24px;
    background-color: white;
}
</style>