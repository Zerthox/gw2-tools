"use client";

import { useCallback, useMemo, useReducer, useState } from "react";
import { Box, Button, Typography, TextField, Stack, Autocomplete } from "@mui/material";
import { pickEntry } from "@/util/rand";
import { GameData, Info } from "./data";
import { SkillSolution, TraitSolution } from "./solution";
import { GameSelect } from "./game-select";

export const enum Mode {
    Trait = "traits",
    Skill = "skills",
}

const enum Status {
    Pending,
    Correct,
    Wrong,
}

export interface GameProps {
    data: GameData;
}

interface GameState {
    mode: Mode;
    status: Status;
    current: Info;
    revealed: number;
}

export function Game({ data }: GameProps) {
    const getStartState = useCallback(
        (mode: Mode) => ({
            mode,
            status: Status.Pending,
            current: pickEntry(data[mode]),
            revealed: 0,
        }),
        [data],
    );

    const [{ mode, status, current, revealed }, setState] = useReducer(
        (prev: GameState, { mode, ...update }: Partial<GameState>) =>
            mode && mode !== prev.mode ? getStartState(mode) : { ...prev, ...update },
        Mode.Trait,
        getStartState,
    );

    const [answer, setAnswer] = useState<string | null>(null);

    const changeMode = useCallback((mode: Mode) => setState({ mode }), [setState]);

    const submit = useCallback(() => {
        const correct = answer?.toLowerCase() === current.name.toLowerCase();
        setState({ status: correct ? Status.Correct : Status.Wrong });
    }, [answer, current.name]);

    const reset = useCallback(() => {
        setAnswer(null);
        setState(getStartState(mode));
    }, [mode, getStartState]);

    const autocomplete = useMemo(
        () => [...new Set(data[mode].map((option) => option.name))],
        [data, mode],
    );

    const color = status === Status.Correct ? "success" : "error";
    const allRevealed = revealed >= current.hints.length;

    return (
        <Stack direction="column" spacing={1} alignItems="center">
            <GameSelect mode={mode} onChange={changeMode} />
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
                    disabled={status !== Status.Pending}
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
                {status === Status.Pending ? (
                    <Button variant="contained" disabled={!answer} onClick={submit}>
                        Submit
                    </Button>
                ) : (
                    <Button variant="contained" color={color} onClick={reset}>
                        Next
                    </Button>
                )}
            </Stack>
            {status === Status.Pending ? (
                <>
                    {current.hints.slice(0, revealed).map((hint, i) => (
                        <Typography key={i}>
                            Hint #{i + 1}: {hint}
                        </Typography>
                    ))}
                    {!allRevealed ? (
                        <Button onClick={() => setState({ revealed: revealed + 1 })}>
                            Reveal hint {revealed + 1}/{current.hints.length}
                        </Button>
                    ) : null}
                </>
            ) : null}
            {status === Status.Correct ? (
                <Typography variant="h6" color="success">
                    Correct!
                </Typography>
            ) : status === Status.Wrong ? (
                <Typography variant="h6" color="error">
                    Incorrect!
                </Typography>
            ) : null}
            {status === Status.Correct || status === Status.Wrong ? (
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
        </Stack>
    );
}
