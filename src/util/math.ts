export const TICK = 40;

export function toTicks(time: number, tickrate: number = TICK): number {
    return Math.ceil(time / tickrate) * tickrate;
}

export function effectiveDuration(base: number, duration: number): number {
    return toTicks(base * (1 + duration / 100));
}

export function roundDurationStat(duration: number): number {
    return Math.ceil(duration * 100) / 100;
}

export function nextDurationStep(base: number, effectiveDuration: number): number {
    return (effectiveDuration / base - 1 + Number.EPSILON) * 100;
}

export function minimizeDuration(base: number, duration: number): number {
    const prevDuration = effectiveDuration(base, duration) - TICK;
    const minimized = nextDurationStep(base, prevDuration);
    return Math.max(0, roundDurationStat(minimized));
}

export function nextHigherDuration(base: number, duration: number): number | null {
    const next = nextDurationStep(base, effectiveDuration(base, duration));
    return next <= 100 ? roundDurationStat(next) : null;
}
