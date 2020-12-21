# Sveltmline
A timeline component for svelte.

Typescript is available. Follow the instruction [here](https://svelte.dev/blog/svelte-and-typescript).

<img src="img/screenshot.png" width=100%>

## Usage
Import sveltmline by npm.
```
npm i sveltmline
```

```Svelte
<script>
import { setContext } from 'svelte';
import { genTracks, TimelineFrame, TrackAsset } from 'sveltmline'

class Obj {
    visible = false;
    // if you push url here a track will automatically become video track.
    url = undefined; 
    OnLoadHtmlElement(elm: HTMLElement){};
    tick(depth: number){};
}

const tracks = genTracks<Obj>();
const t1 = new TrackAsset(new Obj(), 'track_1'); t1.setposition(60, 100);  tracks.push(t1);
const t2 = new TrackAsset(new Obj(), 'track_2'); t2.setposition(10, 60);   tracks.push(t2);
const t3 = new TrackAsset(new Obj(), 'track_3'); t3.setposition(33, 55);   tracks.push(t3);
const t4 = new TrackAsset(new Obj(), 'track_4'); t4.setposition(0, 150);   tracks.push(t4);
const t5 = new TrackAsset(new Obj(), 'track_5'); t5.setposition(100, 140); tracks.push(t5);
const t6 = new TrackAsset(new Obj(), 'track_6'); t6.setposition(40, 55);   tracks.push(t6);
const t7 = new TrackAsset(new Obj(), 'track_7'); t7.setposition(80, 100);  tracks.push(t7);
setContext("tracks", tracks);
</script>

<div id="outer">
<TimelineFrame px_h={300} px_w={800}/>
</div>
```

## License
[MIT](LICENSE)