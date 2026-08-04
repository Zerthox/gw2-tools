export interface Stats {
    conditionDamage: number;
    expertise: number;
    conditionDuration: number;
    conditionDurations: Record<Condition, number>;
}

export type Condition = "Bleeding" | "Burning" | "Confusion" | "Poisoned" | "Torment";

export function calcConditionDuration(stats: Stats, condition: Condition): number {
    return stats.expertise / 15 + stats.conditionDuration + stats.conditionDurations[condition];
}

export function calcConditionDamage(stats: Stats, condition: Condition): number {
    const [base, level, stat] = getConditionCoefs(condition);
    return base + level * 80 + stat * stats.conditionDamage;
}

export function getConditionCoefs(condition: Condition): [number, number, number] {
    switch (condition) {
        case "Bleeding":
            return [2, 0.25, 0.06];
        case "Burning":
            return [7, 1.55, 0.155];
        case "Confusion":
            return [1.25, 0.2125, 0.05];
        case "Poisoned":
            return [3.5, 0.375, 0.06];
        case "Torment":
            return [3, 0.36, 0.09];
    }
}
