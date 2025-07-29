export function pickIndex<T>(array: T[]): number {
    return Math.floor(Math.random() * array.length);
}

export function pickEntry<T>(array: T[]): T {
    return array[pickIndex(array)];
}
