"use client";

import { useState } from "react";
import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { fetchLog, Log } from "@/util/log";

export interface LogImportProps {
    onLog(log: Log): void;
}

export function LogImport({ onLog }: LogImportProps) {
    const [url, setUrl] = useState("");
    const [fetching, setFetching] = useState(false);

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6">Import log</Typography>
            <TextField
                variant="standard"
                value={url}
                placeholder="https://dps.report/abcd-12345678-123456_boss"
                onChange={({ target }) => setUrl(target.value)}
                sx={{ flexGrow: 1 }}
            />
            <Button
                variant="contained"
                disabled={fetching}
                startIcon={fetching ? <CircularProgress color="inherit" size="1em" /> : null}
                onClick={async () => {
                    setFetching(true);
                    try {
                        const log = await fetchLog(url);
                        onLog(log);
                    } finally {
                        setFetching(false);
                    }
                }}
            >
                {fetching ? "Loading" : "Import log"}
            </Button>
        </Stack>
    );
}
