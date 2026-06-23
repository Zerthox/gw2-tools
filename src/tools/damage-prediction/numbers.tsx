import { Stack, Tooltip, Typography } from "@mui/material";

export interface NumbersProps {
    damage: number;
    hits?: number;
    total: number;
    duration: number;
}

export function Numbers({ damage, hits, total, duration }: NumbersProps) {
    const tooltip = (
        <Stack direction="column" alignItems="center">
            <Typography>Total: {formatDamage(damage, 0)}</Typography>
            {hits && (
                <>
                    <Typography>Avg: {formatDamage(damage / hits, 1)}</Typography>
                    <Typography>Hits: {hits}</Typography>
                </>
            )}
        </Stack>
    );

    return (
        <>
            <Tooltip title={tooltip}>
                <Typography justifySelf="end">{formatDPS(damage, duration)}</Typography>
            </Tooltip>
            <Typography justifySelf="end">{formatPercent(damage / total)}</Typography>
        </>
    );
}

function formatDamage(value: number, fraction: number): string {
    return new Intl.NumberFormat("fr", {
        maximumFractionDigits: fraction,
        minimumFractionDigits: fraction,
    })
        .format(value)
        .replace(",", ".");
}

function formatDPS(value: number, durationMs: number): string {
    return formatDamage((value / durationMs) * 1000, 0) + " /s";
}

function formatPercent(percent: number): string {
    return (100 * percent).toFixed(1) + "%";
}
