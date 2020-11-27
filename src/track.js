import { v4 as uuidv4 } from "uuid"

export class TrackAsset {
    target;
    uid;
    type;
    name;
    visible = false;
    focused = false;
    sc_l = 0;
    sc_r = 0;
    px_l = 0;
    px_r = 0;
    dif_px_l = 0;
    dif_px_r = 0;

    constructor(tgt, name, type, sc2px, sc_l, sc_r) {
        this.target = tgt;
        this.uid  = uuidv4();
        this.name = name;
        this.type = type;
        this.sc_l = sc_l;
        this.sc_r = sc_r;
        this.px_l = sc_l * sc2px;
        this.px_r = sc_r * sc2px;
    }

    getdata = () => {
        return {
            uid:  this.uid,
            type: this.type,
            name: this.name,
            sc_l: this.sc_l,
            sc_r: this.sc_r,
        }
    }

    tick = (depth) => this.target.tick(depth);

    is_visible = (t) => t > this.sc_l && t < this.sc_r;

    dragstart_trans = (e) => { this.drag_start_common(e.target, e); }
    dragmove_trans  = (e, px2sc) => { this.onchange_l(e, px2sc); this.onchange_r(e, px2sc);} 
    
    dragstart_scale  = (e) => this.drag_start_common(e.target.parentNode, e);
    dragmove_scale_l = (e, px2sc) => this.onchange_l(e, px2sc)
    dragmove_scale_r = (e, px2sc) => this.onchange_r(e, px2sc)

    drag_start_common = (tgt, e) => {
        this.dif_px_l = (tgt.offsetLeft) - e.pageX;
        this.dif_px_r = (tgt.offsetLeft + tgt.offsetWidth) - e.pageX;
        e.dataTransfer.setDragImage(new Image(), 0, 0)
    }

    onchange_tl_scale = (sc2px) => { this.px_l = this.sc_l * sc2px; this.px_r = this.sc_r * sc2px; }
    onchange_l = (e, px2sc) => { this.px_l = e.pageX + this.dif_px_l; this.sc_l = this.px_l * px2sc; }
    onchange_r = (e, px2sc) => { this.px_r = e.pageX + this.dif_px_r; this.sc_r = this.px_r * px2sc; }
}