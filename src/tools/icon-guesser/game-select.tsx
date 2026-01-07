"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Mode } from "./game";

export interface GameSelectProps {
    mode: Mode;
    onChange: (mode: Mode) => void;
}

export function GameSelect({ mode, onChange }: GameSelectProps) {
    return (
        <ToggleButtonGroup exclusive value={mode} onChange={(_, mode) => onChange(mode)}>
            <ToggleButton value={Mode.Trait}>Traits</ToggleButton>
            <ToggleButton value={Mode.Skill}>Skills</ToggleButton>
        </ToggleButtonGroup>
    );
}
