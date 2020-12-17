import { v4 as uuidv4 } from 'uuid'
import { get } from 'svelte/store'
import { px2sc, sc2px, initw } from './store'

export class TrackAsset {
    target;
    uuid;
    name;
    order = 0;
    sc_l = 0;
    sc_r = 0;
    px_l = 0;
    px_r = 0;
    dif_px_l = 0;
    dif_px_r = 0;
    onchange_cb;
    ondelete_cb;
    menu    = false;
    visible = false;
    focused = false;

    constructor(tgt, name, uuid, onchange_cb, ondelete_cb) {
        this.target = tgt;
        this.name  = name;
        this.uuid = uuid? uuid : uuidv4();
        this.sc_l = 0;
        this.sc_r = get(initw);
        this.px_l = 0;
        this.px_r = get(initw) * get(sc2px);
        this.onchange_cb = onchange_cb;
        this.ondelete_cb = ondelete_cb;
    }

    getdata(){
        return {
            uuid: this.uuid,
            name: this.name,
            sc_l: this.sc_l,
            sc_r: this.sc_r,
        }
    }

    tick(depth, curr){
        const v = curr > this.sc_l && curr < this.sc_r;
        this.target.tick(depth);
        this.target.visible = v;
        this.visible = v; 
    }

    setposition(sc_l, sc_r){
        this.sc_l = sc_l;
        this.sc_r = sc_r;
        this.px_l = sc_l * get(sc2px);
        this.px_r = sc_r * get(sc2px);
    }

    dragbgn_trans(e){ this.bgn_common(e.target, e); }
    dragmov_trans(e){ this.onchange_l(e, get(px2sc)); this.onchange_r(e, get(px2sc)); } 
    dragfin_trans(e){ this.dragmov_trans(e, px2sc); this.onchange(); } 
    
    dragbgn_scale  (e){ this.bgn_common(e.target.parentNode, e); }
    dragmov_scale_l(e){ this.onchange_l(e, get(px2sc)); } 
    dragmov_scale_r(e){ this.onchange_r(e, get(px2sc)); }
    dragfin_scale_l(e){ this.onchange_l(e, get(px2sc)); this.onchange(); }
    dragfin_scale_r(e){ this.onchange_r(e, get(px2sc)); this.onchange(); }

    onchange_tl_scale(){ this.px_l = this.sc_l * get(sc2px); this.px_r = this.sc_r * get(sc2px); }
    onchange_l(e){ this.px_l = e.pageX + this.dif_px_l; this.sc_l = this.px_l * get(px2sc); }
    onchange_r(e){ this.px_r = e.pageX + this.dif_px_r; this.sc_r = this.px_r * get(px2sc); }

    bgn_common(tgt, e){
        this.dif_px_l = (tgt.offsetLeft) - e.pageX;
        this.dif_px_r = (tgt.offsetLeft + tgt.offsetWidth) - e.pageX;
        e.dataTransfer.setDragImage(new Image(), 0, 0)
    }

    onchange(){ if (typeof this.onchange_cb === 'function') this.onchange_cb(this); }
    ondelete(){ if (typeof this.ondelete_cb === 'function') this.ondelete_cb(this); }
}