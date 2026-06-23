"use client";

import { InputAdornment, TextField } from "@mui/material";

export interface InputProps {
    value: number;
    onChange(value: number): void;
}

export function Input({ value, onChange }: InputProps) {
    return (
        <TextField
            type="number"
            size="small"
            sx={{
                marginLeft: 2,
                marginRight: 2,
            }}
            value={value}
            onChange={({ target }) => onChange(Number.parseFloat(target.value))}
            slotProps={{
                input: {
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    inputProps: { step: 0.1 },
                },
            }}
        />
    );
}
