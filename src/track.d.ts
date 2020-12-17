export declare interface ITrackable {
    visible : boolean;
    url: string;
    OnLoadHtmlElement(elm: HTMLElement): void;
    tick(depth: number): void;
}

export declare class TrackAsset<T extends ITrackable> {
    target:  T;
    name:    string;
    order:   number;
    uuid:    string;
    sc_l:    number;
    sc_r:    number;
    px_l:    number;
    px_r:    number;
    menu:    boolean;
    visible: boolean;
    focused: boolean;
    private dif_px_l: number;
    private dif_px_r: number;
    private onchange_cb: (ta: TrackAsset<T>) => void;
    private ondelete_cb: (ta: TrackAsset<T>) => void;

    constructor(
        tgt: T,
        name: string,
        uuid?: string,
        onchange_cb?: (ta: TrackAsset<T>) => void,
        ondelete_cb?: (ta: TrackAsset<T>) => void
    );

    getdata(): object;
    tick(depth: number, curr: number): void;
    setposition(sc_l: number, sc_r: number);

    dragbgn_trans(e): void;
    dragmov_trans(e): void; 
    dragfin_trans(e): void; 

    dragbgn_scale(e): void;
    dragmov_scale_l(e): void;
    dragmov_scale_r(e): void;
    dragfin_scale_l(e): void;
    dragfin_scale_r(e): void;

    onchange_tl_scale(): void;
    onchange_l(e): void;
    onchange_r(e): void;

    onchange(): void;
    ondelete(): void;

    private bgn_common(tgt: HTMLElement, e: DragEvent): void;
}