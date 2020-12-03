export function NormT(time, duration) { return Math.min(Math.max( time / duration, 0.0), 1.0); }
export function PrctT(time, duration) { return NormT(time, duration) * 100; }

export function clickOutside(node) {
    const handler = e => {
        if (node && !node.contains(e.target) && !e.defaultPrevented) 
            node.dispatchEvent(new CustomEvent('click_outside', node))
    }
    document.addEventListener('click', handler, true);
    return { destroy() { document.removeEventListener('click', handler, true); } }
}