import { writable, derived } from 'svelte/store';
import { NormT } from './helper'

export let current   = writable(0);
export let paused    = writable(true);
export let dragged   = writable(false);
export let focusedID = writable(-1);
export let recording = writable(false);
export let sc2px     = writable(6);
export let px2sc     = derived(sc2px, ($sc2px) => 1 / $sc2px);
export let tl_sc     = writable(300);
export let tl_px     = derived([tl_sc, sc2px], ([$tl_sc, $sc2px]) => $tl_sc * $sc2px);
export let normcur   = derived([current, tl_sc, tl_px], ([$current, $tl_sc, $tl_px]) => NormT($current, $tl_sc) * $tl_px);

export function genTracks(){
    const { subscribe, set, update } = writable([]);
	return {
        subscribe,
        set,
        update,
        tick: () => update(arr => {
            arr.forEach((t, i) => t.tick(i));
            return arr;
        }),
        push: (t) => update(arr => {
            return [...arr, t];
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
            [arr[i], arr[j]] = [clone[j], clone[i]];
            return arr;
        })
	};
}