export function NormT(time, duration) { return Math.min(Math.max( time / duration, 0.0), 1.0); }
export function PrctT(time, duration) { return NormT(time, duration) * 100; }