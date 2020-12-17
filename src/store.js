import { writable, derived } from 'svelte/store';
import { NormT } from './helper'

export let current   = writable(0);
export let paused    = writable(true);
export let dragged   = writable(false);
export let focusedID = writable("_");
export let recording = writable(false);
export let sc2px     = writable(6);
export let px2sc     = derived(sc2px, ($sc2px) => 1 / $sc2px);
export let tl_sc     = writable(1000);
export let tl_px     = derived([tl_sc, sc2px], ([$tl_sc, $sc2px]) => $tl_sc * $sc2px);
export let initw     = writable(60);
export let normcur   = derived([current, tl_sc, tl_px], ([$current, $tl_sc, $tl_px]) => NormT($current, $tl_sc) * $tl_px);

export function genTracks(){
    const { subscribe, set, update } = writable([]);
	return {
        subscribe,
        set,
        update,
        tick: (c) => update(arr => {
            arr.forEach((t, i) => t.tick(i, c));
            return arr;
        }),
        push: (t) => update(arr => {
            t.order = arr.length;
            return [...arr, t];
        }),
        delete: (t) => update(arr => {
            t.ondelete();
            return arr.filter(a => a !== t).map(a => {
                if(a.order > t.order){
                    a.order--;
                    a.onchange();
                }
                return a;
            });
        }),
        splice: (i, n) => update(arr => {
            arr.splice(i, n);
            return arr;
        }),
        filter: (t) => update(arr => {
            return arr.filter(a => a != t);
        }),
        flip: (i, j) => update(arr => {
            const clone = [...arr];
            const ci = clone[i];
            const cj = clone[j];
            ci.order = j;
            cj.order = i;
            ci.onchange();
            cj.onchange();
            [arr[i], arr[j]] = [cj, ci];
            return arr;
        }),
        scale: () => update(arr => {
            arr.forEach(t => t.onchange_tl_scale());
            return arr;
        })
	};
}