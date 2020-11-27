<script lang='ts'>
    import {current, paused, sc2px, tl_sc} from '../store';
    export let px_w: number = document.body.clientWidth;
    export let px_h: number = 300;
</script>

<div id="timeline-ctrler" style="--w:{px_w}px; --h:{px_h}px">
	<div id="curr">
		<span>{($current).toFixed(1)}sec</span>
	</div>
	<div id="btns">
		<button class="btn" on:click={() => $paused = !$paused}> <span>toggle play</span></button>
	</div>
	<div id="duration">
		<button on:click={() => $sc2px = $sc2px - 1} disabled={$tl_sc * ($sc2px - 1) < document.body.clientWidth}>zoom in </button>
		<button on:click={() => $sc2px = $sc2px + 1} disabled={$sc2px > 9}>                                       zoom out</button>
		<input bind:value={$tl_sc} min=10>
	</div>
</div>

<style>
#timeline-ctrler {
    display: flex;
    justify-content: space-between;
    width: var(--w);
    height: var(--h);
}
#timeline-ctrler #curr {
    width: 220px;
    padding: 0px 15px;
}
#timeline-ctrler #curr span {
    line-height: var(--h);
}
#timeline-ctrler #duration {
    width: 250px;
    margin: 20px 0;
}
#timeline-ctrler #duration button {
    width: 70px;
    height: 30px;
    font-size: 11px;
}
#timeline-ctrler #duration input {
    position: absolute;
    right: 15px;
	text-align: right;
    width: 70px;
	height: 30px;
}
#timeline-ctrler #btns {
    display: flex;
    justify-content: center;
}

#timeline-ctrler #btns .btn {
    background-color: white;
    margin: 17px 2px;
    padding: 0;
    width: 100px;
    height: 36px;
}

#timeline-ctrler #btns .btn span {
    line-height: 30px;
    font-size: 13px;
}

</style>