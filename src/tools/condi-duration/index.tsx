"use client";

import React, { useState } from "react";
import { Stack, FormHelperText, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { ConditionEntry } from "./entry";

export function CondiDurationCalculator() {
    const [rows, setRows] = useState(1);

    return (
        <Stack direction="column" spacing={2}>
            <FormHelperText>
                Insert Condition Duration attribute from Hero Panel and base durations of all
                applied Conditions.
            </FormHelperText>
            {Array(rows)
                .fill(0)
                .map((_, i) => (
                    <ConditionEntry key={i} />
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
        </Stack>
    );
}
