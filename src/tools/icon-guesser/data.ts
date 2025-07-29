import { encode } from "gw2e-chat-codes";
import { fetchGw2Api } from "@gw2api/fetch";
import { Skill } from "@gw2api/types/data/skill";

export interface GameData {
    skills: Info[];
    traits: Info[];
}

export interface Info {
    id: number;
    name: string;
    icon: string;
    link: string;
    hints: string[];
}

const monsterIcon =
    "https://render.guildwars2.com/file/1D55D34FB4EE20B1962E315245E40CA5E1042D0E/62248.png";

const traitTiers = ["Proficiency", "Adept", "Master", "Grandmaster"];

const skillSlots: Record<Skill.Slot, string | false> = {
    Downed_1: false,
    Downed_2: false,
    Downed_3: false,
    Downed_4: false,
    Elite: "Elite",
    Heal: "Heal",
    Pet: "Pet",
    Profession_1: "Profession",
    Profession_2: "Profession",
    Profession_3: "Profession",
    Profession_4: "Profession",
    Profession_5: "Profession",
    Toolbelt: "Toolbelt",
    Transform_1: "Transform",
    Utility: "Utility",
    Weapon_1: "Weapon",
    Weapon_2: "Weapon",
    Weapon_3: "Weapon",
    Weapon_4: "Weapon",
    Weapon_5: "Weapon",
};

const buffs = [
    "Aegis",
    "Alacrity",
    "Fury",
    "Might",
    "Protection",
    "Quickness",
    "Regeneration",
    "Resistance",
    "Resolution",
    "Stability",
    "Swiftness",
    "Vigor",
    "Bleeding",
    "Burning",
    "Confusion",
    "Poisoned",
    "Torment",
    "Blinded",
    "Chilled",
    "Crippled",
    "Fear",
    "Immobile",
    "Slow",
    "Taunt",
    "Weakness",
    "Vulnerability",
    "Revealed",
    "Stealth",
];

export async function loadData(): Promise<GameData> {
    const skills: Info[] = [];
    const traits: Info[] = [];

    const specs = Object.fromEntries(
        (await fetchGw2Api("/v2/specializations?ids=all", {})).map((spec) => [spec.id, spec])
    );

    for (const skill of await fetchGw2Api("/v2/skills?ids=all", {})) {
        if (
            skill.name &&
            skill.icon &&
            skill.icon !== monsterIcon &&
            skill.professions?.length === 1 &&
            skill.slot &&
            skillSlots[skill.slot]
        ) {
            const hints = [];

            const recharge = skill.facts?.find((fact) => fact.type === "Recharge");
            if (recharge) {
                hints.push(`Recharge of ${recharge.value}s`);
            }

            hints.push(`In ${skillSlots[skill.slot]} slot`);
            hints.push(`Used by ${skill.professions[0]}`);

            const buff = skill.facts?.find(
                (fact) => fact.type === "Buff" && fact.status && buffs.includes(fact.status)
            );
            if (buff) {
                hints.push(`Applies ${buff.status}`);
            }

            if (skill.categories) {
                hints.push(`In ${skill.categories[0]} category`);
            }

            skills.push({
                id: skill.id,
                name: skill.name,
                icon: skill.icon as string,
                link: encode("skill", skill.id) || skill.name,
                hints,
            });
        }
    }

    for (const trait of await fetchGw2Api("/v2/traits?ids=all", {})) {
        const spec = specs[trait.specialization];
        if (spec && trait.name && trait.icon && trait.tier > 0) {
            const hints = [`In ${traitTiers[trait.tier]} tier`, `Used by ${spec.profession}`];

            const attr = trait.facts?.find((fact) => fact.type === "AttributeAdjust");
            if (attr) {
                hints.push(`Grants ${attr.target}`);
            }

            const buff = trait.facts?.find(
                (fact) => fact.type === "Buff" && fact.status && buffs.includes(fact.status)
            );
            if (buff) {
                hints.push(`Applies ${buff.status}`);
            }

            hints.push(`Part of ${spec.name} specialization`);

            traits.push({
                id: trait.id,
                name: trait.name,
                icon: trait.icon,
                link: encode("trait", trait.id) || trait.name,
                hints,
            });
        }
    }

    return {
        skills: skills.sort(compare),
        traits: traits.sort(compare),
    };
}

function compare(a: Info, b: Info): number {
    return a.name.localeCompare(b.name);
}
