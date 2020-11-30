export declare interface ITrackable {
    visible : boolean;
    url: string;
    OnLoadHtmlElement(elm: HTMLElement): void;
    tick(depth: number): void;
}

export declare class TrackAsset<T extends ITrackable> {
    public target:  T;
    public uid:     number;
    public type:    string;
    public name:    string;
    public visible: boolean;
    public focused: boolean;
    public sc_l:    number;
    public sc_r:    number;
    public px_l:    number;
    public px_r:    number;
    dif_px_l:       number;
    dif_px_r:       number;

    constructor(tgt: T, name: string, type: string, sc2px:number, sc_l: number, sc_r:number);
    getdata(): object;
    tick(depth: number, curr: number): void;
    is_visible(t: number): boolean;
    dragstart_trans(e): void;
    dragmove_trans(e, px2sc:number): void; 
    dragstart_scale(e): void;
    dragmove_scale_l(e, px2sc: number): void;
    dragmove_scale_r(e, px2sc: number): void;
    drag_start_common(tgt: HTMLElement, e: DragEvent): void;
    onchange_tl_scale(sc2px: number): void;
    onchange_l(e, px2sc: number): void;
    onchange_r(e, px2sc: number): void;
}