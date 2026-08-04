"use client";

import { CONDITION_ICONS } from "@/assets/conditions";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import Image from "next/image";

export type Condition = "Bleeding" | "Burning" | "Confusion" | "Poisoned" | "Torment";

export interface ConditionStatsProps {
    condition: Condition;
    onChange: (condition: Condition) => void;
}

export function ConditionInput({ condition, onChange }: ConditionStatsProps) {
    return (
        <ToggleButtonGroup exclusive value={condition} onChange={(_, value) => onChange(value)}>
            {Object.entries(CONDITION_ICONS).map(([condition, icon]) => (
                <ToggleButton key={condition} value={condition}>
                    <Image src={icon} alt={condition} width={24} height={24} />
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
