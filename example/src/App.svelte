<script lang="ts">
import { setContext } from 'svelte';
import { genTracks, TimelineFrame, TrackAsset } from 'sveltmline'

class Obj {
    visible = false;
    url = undefined;
    OnLoadHtmlElement(elm: HTMLElement){};
    tick(depth: number){};
}

const tracks:any = genTracks<Obj>();


const t1 = new TrackAsset(new Obj(), 't1');
const t2 = new TrackAsset(new Obj(), 't2');
const t3 = new TrackAsset(new Obj(), 't3');
const t4 = new TrackAsset(new Obj(), 't4');
const t5 = new TrackAsset(new Obj(), 't5');
const t6 = new TrackAsset(new Obj(), 't6');
const t7 = new TrackAsset(new Obj(), 't7');
const t8 = new TrackAsset(new Obj(), 't8');
t2.setposition(60, 120);
tracks.push(t1);
tracks.push(t2);
tracks.push(t3);
tracks.push(t4);
tracks.push(t5);
tracks.push(t6);
tracks.push(t7);
tracks.push(t8);

setContext("tracks", tracks);
</script>

<main>
	<div id="outer">
	<TimelineFrame px_h={300} px_w={1000} v={false}/>
	</div>
</main>

<style>
	#outer{
		margin-top: 100px;
		margin-left: 100px;
		width: 1000px;
		height: 300px;
		border: 1px solid #aaa;
	}
</style>