import { Writable, Readable } from 'svelte/store';
import type { TrackAsset, ITrackable } from './track.js';

export declare let current:   Writable<number>;
export declare let paused:    Writable<boolean>;
export declare let dragged:   Writable<boolean>;
export declare let focusedID: Writable<string>;
export declare let recording: Writable<boolean>;
export declare let sc2px:     Writable<number>;
export declare let px2sc:     Readable<number>;
export declare let tl_sc:     Writable<number>;
export declare let tl_px:     Readable<number>;
export declare let initw:     Writable<number>;
export declare let normcur:   Readable<number>;

export declare interface Tracks<T extends ITrackable> extends Writable<TrackAsset<T>[]> {
    push(t:TrackAsset<T>): void;
    tick(c: number): void;
    rename(t:TrackAsset<T>, n: string): void;
    delete(t:TrackAsset<T>): void;
    splice(i:number, n: number): void;
    filter(t:TrackAsset<T>): void;
    flip(i: number, j: number): void;
    scale(): void;
}

export declare function genTracks<T extends ITrackable>();