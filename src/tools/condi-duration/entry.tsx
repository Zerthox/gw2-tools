"use client";

import { useState } from "react";
import { Stack, TextField, InputAdornment, Typography } from "@mui/material";
import { effectiveDuration, minimizeDuration, nextHigherDuration } from "@/util/math";

const formatMs = (ms: number) => `${new Intl.NumberFormat("fr").format(ms)}ms`;

export function ConditionEntry() {
    const [duration, setDuration] = useState(0);
    const durationValid = duration >= 0 && duration <= 100;

    const [base, setBase] = useState(1000);
    const baseValid = base > 0;

    const valid = durationValid && baseValid;

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <TextField
                type="number"
                label="Duration"
                value={duration}
                error={!durationValid}
                onChange={({ target }) => setDuration(Number.parseFloat(target.value))}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        inputProps: { min: 0, max: 100, step: 0.1 },
                    },
                }}
                sx={{ width: 120 }}
            />
            <TextField
                type="number"
                label="Base"
                value={base / 1000}
                error={!baseValid}
                onChange={({ target }) => setBase(Number.parseFloat(target.value) * 1000)}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        inputProps: { min: 0, step: 1 },
                    },
                }}
                sx={{ width: 120 }}
            />
            {valid ? (
                <>
                    <Stack direction="column" spacing={0.5}>
                        <Typography>
                            Effective duration: {formatMs(effectiveDuration(base, duration))}
                        </Typography>
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
