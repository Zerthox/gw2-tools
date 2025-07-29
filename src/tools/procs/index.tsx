"use client";

import { useState } from "react";
import { Stack, TextField, InputAdornment, Typography } from "@mui/material";
import { toTicks } from "@/util/math";

export function ProcCalculator() {
    const [phase, setPhase] = useState(20);
    const [interval, setInterval] = useState(2);
    const [duration, setDuration] = useState(12);
    const [tickrate, setTickrate] = useState(1);

    const phaseValid = phase > 0;
    const intervalValid = interval > 0;
    const durationValid = duration >= 0;
    const tickrateValid = tickrate >= 0;
    const valid = phaseValid && intervalValid && durationValid && tickrateValid;

    const singleDuration = tickrate > 0 ? toTicks(duration, tickrate) : duration;
    let totalProcs = 0;
    let totalDuration = 0;
    if (valid) {
        for (let time = 0; time < phase; time += interval) {
            if (duration > 0) {
                const effectiveDuration = Math.min(phase - time, duration);
                const tickTime =
                    tickrate > 0 ? toTicks(effectiveDuration, tickrate) : effectiveDuration;
                totalProcs += tickTime / singleDuration;
                totalDuration += tickTime;
            } else {
                totalProcs += 1;
            }
        }
    }

    return (
        <Stack direction="column" spacing={2}>
            <TextField
                type="number"
                label="Phase Duration"
                helperText="Time frame of combat to calculate procs for."
                value={phase}
                onChange={({ target }) => setPhase(Number.parseFloat(target.value))}
                error={!phaseValid}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        inputProps: { min: 0, step: 0.1 },
                    },
                }}
            />
            <TextField
                type="number"
                label="Proc Interval"
                helperText="Interval or cooldown at which the proc happens."
                value={interval}
                onChange={({ target }) => setInterval(Number.parseFloat(target.value))}
                error={!intervalValid}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        inputProps: { min: 0, step: 0.1 },
                    },
                }}
            />
            <TextField
                type="number"
                label="Proc Duration"
                helperText="Duration for a proc to take full effect. For example duration of inflicted Conditions. A duration of 0 indicates instant full effect."
                value={duration}
                onChange={({ target }) => setDuration(Number.parseFloat(target.value))}
                error={!durationValid}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        inputProps: { min: 0, step: 0.1 },
                    },
                }}
            />
            <TextField
                type="number"
                label="Proc Tickrate"
                helperText="Interval between proc ticks. For example 1s for Conditions. A tickrate of 0 indicates infinitely small tickrate."
                value={tickrate}
                onChange={({ target }) => setTickrate(Number.parseFloat(target.value))}
                error={!tickrateValid}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        inputProps: { min: 0, step: 0.1 },
                    },
                }}
            />
            {valid ? (
                <>
                    <Typography>Single Proc Duration: {singleDuration.toFixed(3)}s</Typography>
                    <Typography>Effective Procs: {totalProcs.toFixed(3)}</Typography>
                    <Typography>Total Duration: {totalDuration.toFixed(3)}s</Typography>
                </>
            ) : (
                <Typography color="error">Invalid parameters.</Typography>
            )}
        </Stack>
    );
}
