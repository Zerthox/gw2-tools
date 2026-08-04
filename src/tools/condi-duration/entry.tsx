"use client";

import { useState } from "react";
import { Stack, TextField, InputAdornment, Typography } from "@mui/material";
import { calcEffectiveDuration, minimizeDuration, nextHigherDuration } from "@/util/tick";
import { calcConditionDamage, calcConditionDuration, Stats } from "@/util/stats";
import { ConditionInput, Condition } from "./condition";

export interface ConditionEntryProps {
    stats: Stats;
}

export function ConditionEntryProps({ stats }: ConditionEntryProps) {
    const [condition, setCondition] = useState<Condition>("Bleeding");
    const [base, setBase] = useState(1000);

    const duration = calcConditionDuration(stats, condition);
    const damage = calcConditionDamage(stats, condition);
    const effective = calcEffectiveDuration(base, duration) / 1000;
    const valid = base > 0;

    return (
        <Stack direction="row" spacing={3} alignItems="center">
            <ConditionInput condition={condition} onChange={setCondition} />
            <TextField
                type="number"
                label="Base"
                value={base / 1000}
                error={!valid}
                onChange={({ target }) => setBase(Number.parseFloat(target.value) * 1000)}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        inputProps: { min: 0, step: 1 },
                    },
                }}
                sx={{ width: 100 }}
            />
            {valid ? (
                <>
                    <Stack direction="column" spacing={0.5}>
                        <Typography>
                            Effective duration:{" "}
                            {(calcEffectiveDuration(base, duration) / 1000).toFixed(3)}s
                        </Typography>
                        <Typography>Effective damage: {(damage * effective).toFixed(1)}</Typography>
                    </Stack>
                    <Stack direction="column" spacing={0.5}>
                        <Typography>
                            Minimized Condition Duration:{" "}
                            {minimizeDuration(base, duration).toFixed(2)}%
                        </Typography>
                        <Typography>
                            Next higher Condition Duration:{" "}
                            {nextHigherDuration(base, duration)?.toFixed(2) ?? "-"}%
                        </Typography>
                    </Stack>
                </>
            ) : (
                <Typography color="error">Invalid parameters.</Typography>
            )}
        </Stack>
    );
}
