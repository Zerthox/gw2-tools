"use client";

import { useState } from "react";
import { Stack } from "@mui/material";
import { Grid } from "./grid";
import { LogImport } from "./import";
import { Log } from "@/util/log";

export function DamagePrediction() {
    const [log, setLog] = useState<Log>();

    return (
        <Stack direction="column">{log ? <Grid log={log} /> : <LogImport onLog={setLog} />}</Stack>
    );
}

export interface SkillInfo {
    id?: number;
    name: string;
    icon?: string;
    indirect: boolean;
}
