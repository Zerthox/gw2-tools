"use client";

import { useState } from "react";
import { Stack, FormHelperText, IconButton, Divider, Tabs, Tab, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { ConditionEntryProps } from "./entry";
import { ConditionStats } from "./stats";
import { Stats } from "@/util/stats";

const initialSetups: Stats[] = [
    {
        conditionDamage: 2700,
        expertise: 700,
        conditionDuration: 0,
        conditionDurations: {
            Bleeding: 0,
            Burning: 0,
            Confusion: 0,
            Poisoned: 0,
            Torment: 0,
        },
    },
    {
        conditionDamage: 2500,
        expertise: 800,
        conditionDuration: 0,
        conditionDurations: {
            Bleeding: 0,
            Burning: 0,
            Confusion: 0,
            Poisoned: 0,
            Torment: 0,
        },
    },
    {
        conditionDamage: 2000,
        expertise: 900,
        conditionDuration: 0,
        conditionDurations: {
            Bleeding: 0,
            Burning: 0,
            Confusion: 0,
            Poisoned: 0,
            Torment: 0,
        },
    },
];

export function CondiDurationCalculator() {
    const [setups, setSetups] = useState(initialSetups);
    const [active, setActive] = useState(0);

    return (
        <Stack direction="column" spacing={2}>
            <Stack direction="row">
                <Tabs value={active} onChange={(_, value) => setActive(value)}>
                    <Tab label="Setup A" value={0} />
                    <Tab label="Setup B" value={1} />
                    <Tab label="Setup C" value={2} />
                </Tabs>
                <Button
                    variant="outlined"
                    sx={{ marginLeft: "auto" }}
                    onClick={() => {
                        setSetups(Array(3).fill(setups[active]));
                    }}
                >
                    Copy to all
                </Button>
            </Stack>
            <CondiDurationSetup
                stats={setups[active]}
                onChange={(stats) => {
                    const newSetups = [...setups];
                    newSetups[active] = stats;
                    setSetups(newSetups);
                }}
            />
        </Stack>
    );
}

export interface CondiDurationSetupProps {
    stats: Stats;
    onChange: (stats: Stats) => void;
}

export function CondiDurationSetup({ stats, onChange }: CondiDurationSetupProps) {
    const [rows, setRows] = useState(1);

    return (
        <>
            <FormHelperText>
                Insert attributes from Hero Panel and base durations of applied Conditions.
            </FormHelperText>
            <ConditionStats stats={stats} onChange={onChange} />
            <Divider />
            {Array(rows)
                .fill(0)
                .map((_, i) => (
                    <ConditionEntryProps key={i} stats={stats} />
                ))}
            <Stack direction="row" spacing={1}>
                <IconButton size="small" title="Add Row" onClick={() => setRows(rows + 1)}>
                    <Add />
                </IconButton>
                <IconButton
                    size="small"
                    title="Remove Row"
                    onClick={() => setRows(Math.max(1, rows - 1))}
                >
                    <Remove />
                </IconButton>
            </Stack>
        </>
    );
}
