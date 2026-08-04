"use client";

import { Stack, TextField, InputAdornment, Typography } from "@mui/material";
import { calcConditionDamage, calcConditionDuration, Condition, Stats } from "@/util/stats";
import { CONDITION_ICONS } from "@/assets/conditions";
import Image from "next/image";

export interface ConditionStatsProps {
    stats: Stats;
    onChange: (stats: Stats) => void;
}

export function ConditionStats({ stats, onChange }: ConditionStatsProps) {
    return (
        <>
            <Stack direction="row" spacing={1}>
                <TextField
                    type="number"
                    label="Condition Damage"
                    value={stats.conditionDamage}
                    onChange={({ target }) =>
                        onChange({ ...stats, conditionDamage: Number.parseFloat(target.value) })
                    }
                    sx={{ width: 130 }}
                />
                <TextField
                    type="number"
                    label="Expertise"
                    value={stats.expertise}
                    onChange={({ target }) =>
                        onChange({ ...stats, expertise: Number.parseFloat(target.value) })
                    }
                    sx={{ width: 130 }}
                />
                <TextField
                    type="number"
                    label="Condition Duration"
                    value={stats.conditionDuration}
                    onChange={({ target }) =>
                        onChange({ ...stats, conditionDuration: Number.parseFloat(target.value) })
                    }
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            inputProps: { min: 0, max: 100, step: 0.1 },
                        },
                    }}
                    sx={{ width: 130 }}
                />
                {Object.entries(stats.conditionDurations).map(([condition, duration]) => (
                    <TextField
                        key={condition}
                        type="number"
                        label={condition}
                        value={duration}
                        onChange={({ target }) =>
                            onChange({
                                ...stats,
                                conditionDurations: {
                                    ...stats.conditionDurations,
                                    [condition]: Number.parseFloat(target.value),
                                },
                            })
                        }
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                inputProps: { min: 0, max: 100, step: 0.1 },
                            },
                        }}
                        sx={{ width: 130 }}
                    />
                ))}
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="space-evenly">
                {Object.entries(CONDITION_ICONS).map(([condition, icon]) => (
                    <Stack key={condition} direction="row" alignItems="center" spacing={1}>
                        <Image src={icon} alt={condition} width={20} height={20} />
                        <Typography>
                            {calcConditionDuration(stats, condition as Condition).toFixed(2)}%
                        </Typography>
                        <Typography>
                            {calcConditionDamage(stats, condition as Condition).toFixed(1)}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </>
    );
}
