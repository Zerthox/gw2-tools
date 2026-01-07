"use client";

import { Link } from "@mui/material";
import { CustomComponent, useSkill, useTrait } from "@discretize/gw2-ui-new";
import { Info } from "./data";

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

export interface TraitSolutionProps {
    info: Info;
}

export function TraitSolution({ info }: TraitSolutionProps) {
    const { loading, error, data } = useTrait(info.id);
    return <Solution type="Trait" info={info} loading={loading} error={error} data={data} />;
}

export interface SkillSolutionProps {
    info: Info;
}

export function SkillSolution({ info }: SkillSolutionProps) {
    const { loading, error, data } = useSkill(info.id);
    return <Solution type="Skill" info={info} loading={loading} error={error} data={data} />;
}
