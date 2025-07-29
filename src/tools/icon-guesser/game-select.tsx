"use client";

import { useState } from "react";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { GameData } from ".";
import { Game, Mode } from "./game";

export interface GameSelectProps {
    data: GameData;
}

export function GameSelect({ data }: GameSelectProps) {
    const [mode, setMode] = useState(Mode.Trait);

    const { traits, skills } = data;
    const selected = mode === Mode.Trait ? traits : skills;

    return (
        <Stack direction="column" spacing={1} alignItems="center">
            <ToggleButtonGroup exclusive value={mode} onChange={(_, mode) => setMode(mode)}>
                <ToggleButton value={Mode.Trait}>Traits</ToggleButton>
                <ToggleButton value={Mode.Skill}>Skills</ToggleButton>
            </ToggleButtonGroup>
            <Game mode={mode} options={selected} />
        </Stack>
    );
}
