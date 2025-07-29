"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, Typography, TextField, Stack, Autocomplete, Link } from "@mui/material";
import { CustomComponent, useSkill, useTrait } from "@discretize/gw2-ui-new";
import { pickEntry } from "@/util/rand";
import { Info } from "./data";

export const enum Mode {
    Trait = "trait",
    Skill = "skill",
}

const enum State {
    Pending,
    Correct,
    Wrong,
}

export interface GameProps {
    mode: Mode;
    options: Info[];
}

export function Game({ mode, options }: GameProps) {
    const [state, setState] = useState(State.Pending);
    const [answer, setAnswer] = useState<string | null>(null);
    const [current, setCurrent] = useState(() => options[0]);
    const [revealed, setRevealed] = useState(0);

    const autocomplete = useMemo(
        () => [...new Set(options.map((option) => option.name))],
        [options],
    );

    const submit = useCallback(() => {
        const correct = answer?.toLowerCase() === current.name.toLowerCase();
        setState(correct ? State.Correct : State.Wrong);
    }, [answer, current.name]);

    const reset = useCallback(() => {
        setAnswer(null);
        setState(State.Pending);
        setRevealed(0);
        setCurrent(pickEntry(options));
    }, [options]);

    useEffect(reset, [reset, options]);

    const color = state === State.Correct ? "success" : "error";
    const allRevealed = revealed >= current.hints.length;

    return (
        <>
            <Typography variant="h5">
                Which {mode === Mode.Trait ? "Trait" : "Skill"} is this?
            </Typography>
            <Box
                width="5em"
                height="5em"
                sx={{
                    backgroundImage: `url(${current.icon})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50%",
                    backgroundRepeat: "no-repeat",
                }}
            ></Box>
            <Stack direction="row" spacing={1}>
                <Autocomplete
                    options={autocomplete}
                    value={answer}
                    onChange={(_, value) => setAnswer(value)}
                    disabled={state !== State.Pending}
                    disablePortal
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Answer"
                            onKeyUp={({ key }) => {
                                if (key === "Enter" && answer) {
                                    submit();
                                }
                            }}
                            sx={{ width: "20em" }}
                        ></TextField>
                    )}
                />
                {state === State.Pending ? (
                    <Button variant="contained" disabled={!answer} onClick={submit}>
                        Submit
                    </Button>
                ) : (
                    <Button variant="contained" color={color} onClick={reset}>
                        Next
                    </Button>
                )}
            </Stack>
            {state === State.Pending ? (
                <>
                    {current.hints.slice(0, revealed).map((hint, i) => (
                        <Typography key={i}>
                            Hint #{i + 1}: {hint}
                        </Typography>
                    ))}
                    {!allRevealed ? (
                        <Button onClick={() => setRevealed(revealed + 1)}>
                            Reveal hint {revealed + 1}/{current.hints.length}
                        </Button>
                    ) : null}
                </>
            ) : null}
            {state === State.Correct ? (
                <Typography variant="h6" color="success">
                    Correct!
                </Typography>
            ) : state === State.Wrong ? (
                <Typography variant="h6" color="error">
                    Incorrect!
                </Typography>
            ) : null}
            {state === State.Correct || state === State.Wrong ? (
                <>
                    <Typography color={color} component="span">
                        Solution:{" "}
                        {mode === Mode.Trait ? (
                            <TraitSolution info={current} />
                        ) : (
                            <SkillSolution info={current} />
                        )}
                    </Typography>
                </>
            ) : null}
        </>
    );
}

interface SolutionProps {
    type: "Skill" | "Trait";
    info: Info;
    loading: boolean;
    error: false | number;
    data: unknown;
}

function Solution({ type, info, loading, error, data }: SolutionProps) {
    return loading ? (
        <span>Loading...</span>
    ) : error ? (
        <Link
            href={`https://wiki.guildwars2.com/wiki/Special:Search/${encodeURIComponent(info.link)}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {info.name}
        </Link>
    ) : (
        <CustomComponent type={type} data={data} text={info.name} disableIcon />
    );
}

interface TraitSolutionProps {
    info: Info;
}

function TraitSolution({ info }: TraitSolutionProps) {
    const { loading, error, data } = useTrait(info.id);
    return <Solution type="Trait" info={info} loading={loading} error={error} data={data} />;
}

interface SkillSolutionProps {
    info: Info;
}

function SkillSolution({ info }: SkillSolutionProps) {
    const { loading, error, data } = useSkill(info.id);
    return <Solution type="Skill" info={info} loading={loading} error={error} data={data} />;
}
