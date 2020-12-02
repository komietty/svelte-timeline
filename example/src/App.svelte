<script lang="ts">
import { setContext } from 'svelte';
import { get } from 'svelte/store'
import { genTracks, TimelineFrame, TrackAsset, sc2px } from 'sveltmline'

class Obj {
    visible = false;
    url = "";
    OnLoadHtmlElement(elm: HTMLElement){};
    tick(depth: number){};
}

const tracks:any = genTracks<Obj>();


tracks.push(new TrackAsset(new Obj(), 'u', 'utils', get(sc2px), 0, 60  , undefined));
tracks.push(new TrackAsset(new Obj(), 'u', 'utils', get(sc2px), 60, 120, undefined));
tracks.push(new TrackAsset(new Obj(), 'u', 'utils', get(sc2px), 0, 60  , undefined));
tracks.push(new TrackAsset(new Obj(), 'u', 'utils', get(sc2px), 60, 120, undefined));
tracks.push(new TrackAsset(new Obj(), 'u', 'utils', get(sc2px), 60, 120, undefined));
tracks.push(new TrackAsset(new Obj(), 'u', 'utils', get(sc2px), 60, 120, undefined));

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