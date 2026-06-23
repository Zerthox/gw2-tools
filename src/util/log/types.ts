export interface Log {
    arcVersion: string;
    eliteInsightsVersion: string;
    fightName: string;
    fightIcon: string;
    success: boolean;
    isCM?: boolean;
    wvw: boolean;
    recordedBy: string;
    buffMap: Record<string, Skill>;
    skillMap: Record<string, Skill>;
    players: Player[];
    phases: Phase[];
}

export interface Phase {
    name: string;
    phaseType: "Encounter" | "SubPhase" | "TimeFrame" | "Instance";
    start: number;
    end: number;
    targets: number[];
    secondaryTargets: number[];
    targetPriorities: Record<number, string>;
    breakbarPhase: boolean;
    subPhases?: number[];
}

export interface Player {
    name: string;
    account: string;
    profession: string;
    group: number;
    hasCommanderTag: boolean;
    guildID: string;
    isFake: boolean;
    targetDamageDist: DamageDistEntry[][][];
}

export interface Target {
    id: number;
    instanceID: number;
    name: string;
    totalHealth: number;
    isFake: boolean;
    enemyPlayer: boolean;
}

export interface Skill {
    name: string;
    icon: string;
    autoAttack: boolean;
    isGearProc: boolean;
    isInstantCast: boolean;
    isNotAccurate: boolean;
    isSwap: boolean;
    isTraitProc: boolean;
    isUnconditionalProc: boolean;
    canCrit: boolean;
    conversionBasedHealing: boolean;
    hybridHealing: boolean;
}

export interface Buff {
    name: string;
    icon: string;
    classification: string;
    descriptions: string[];
    stacking: boolean;
}

export interface DamageDistEntry {
    againstMoving: number;
    blocked: number;
    connectedHits: number;
    crit: number;
    critDamage: number;
    evaded: number;
    flank: number;
    glance: number;
    hits: number;
    id: number;
    indirectDamage: boolean;
    interrupted: number;
    invulned: number;
    max: number;
    min: number;
    missed: number;
    shieldDamage: number;
    totalBreakbarDamage: number;
    totalDamage: number;
}
