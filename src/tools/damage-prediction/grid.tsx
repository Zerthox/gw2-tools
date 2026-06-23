"use client";

import { Box, Typography, TypographyProps } from "@mui/material";
import { Log } from "@/util/log";
import { useMemo, useState } from "react";
import { SkillInfo } from ".";
import { Skill } from "./skill";
import { Numbers } from "./numbers";
import { Input } from "./input";

export interface GridProps {
    log: Log;
}

interface DamageEntry {
    skill: SkillInfo;
    damage: number;
    hits: number;
}

export function Grid({ log }: GridProps) {
    const player = useMemo(
        () => log.players.find((player) => player.name === log.recordedBy) ?? log.players[0],
        [log],
    );
    const phaseId = useMemo(
        () => log.phases.findIndex((phase) => phase.phaseType === "Encounter") ?? 0,
        [log],
    );
    const phase = log.phases[phaseId];
    const duration = phase.end - phase.start;
    const targetId = phase.targets[0];

    const damageDist = useMemo<DamageEntry[]>(() => {
        const damageDist = player.targetDamageDist[targetId][phaseId];
        return damageDist
            .map(({ id, totalDamage, indirectDamage, hits }) => {
                const { name, icon } = log.skillMap["s" + id] ?? log.buffMap["b" + id];
                return {
                    skill: {
                        id,
                        name,
                        icon,
                        indirect: indirectDamage,
                    },
                    hits,
                    damage: totalDamage,
                };
            })
            .toSorted((a, b) => b.damage - a.damage);
    }, [log]);

    const totalBefore = useMemo(
        () => damageDist.reduce((sum, { damage }) => sum + damage, 0),
        [damageDist],
    );

    const [changes, setChanges] = useState(() => Array(damageDist.length + 1).fill(0));

    const totalAfter = useMemo(
        () => damageDist.reduce((sum, { damage }, i) => sum + applyChange(damage, changes[i]), 0),
        [damageDist, changes],
    );

    return (
        <Box
            display="grid"
            gridTemplateColumns="1fr repeat(2, 0.5fr) 1fr repeat(2, 0.5fr)"
            gridAutoRows="1fr"
            columnGap={1}
            rowGap={0.5}
            alignItems="center"
        >
            <Header />
            <Total before={totalBefore} after={totalAfter} duration={duration}></Total>
            {damageDist.map(({ skill, damage, hits }, i) => (
                <>
                    <Skill {...skill}></Skill>
                    <Numbers
                        damage={damage}
                        hits={hits}
                        total={totalBefore}
                        duration={duration}
                    ></Numbers>
                    <Input
                        value={changes[i]}
                        onChange={(value) => setChanges({ ...changes, [i]: value })}
                    ></Input>
                    <Numbers
                        damage={applyChange(damage, changes[i])}
                        hits={hits}
                        total={totalAfter}
                        duration={duration}
                    ></Numbers>
                </>
            ))}
        </Box>
    );
}

function applyChange(damage: number, change: number): number {
    return damage * (1 + change / 100);
}

function Header() {
    const props: Partial<TypographyProps> = { variant: "h6", justifySelf: "center" };
    return (
        <>
            <Typography {...props}>Skill</Typography>
            <Typography {...props} gridColumn="2 / 4">
                Before
            </Typography>
            <Typography {...props}>Change</Typography>
            <Typography {...props} gridColumn="5 / 7">
                After
            </Typography>
        </>
    );
}

interface TotalProps {
    before: number;
    after: number;
    duration: number;
}

function Total({ before, after, duration }: TotalProps) {
    return (
        <>
            <Typography>Total</Typography>
            <Numbers damage={before} total={before} duration={duration}></Numbers>
            <Box></Box>
            <Numbers damage={after} total={after} duration={duration}></Numbers>
        </>
    );
}
