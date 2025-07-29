import {
    Whatshot,
    QueryStats,
    SvgIconComponent,
    ImageSearch,
    HelpCenter,
} from "@mui/icons-material";
import { CondiDurationCalculator } from "./condi-duration";
import { ProcCalculator } from "./procs";
import { SkillViewer } from "./skill-viewer";
import { IconGuesser } from "./icon-guesser";

export interface Tool {
    title: string;
    description: string;
    icon: SvgIconComponent;
    content: React.ComponentType;
}

export const tools: Record<string, Tool> = {
    "condi-duration": {
        title: "Condition Duration Calculator",
        description: "Calculate precise condition durations",
        icon: Whatshot,
        content: CondiDurationCalculator,
    },
    procs: {
        title: "Proc Calculator",
        description: "Calculate generic proc rates",
        icon: QueryStats,
        content: ProcCalculator,
    },
    "icon-guesser": {
        title: "Icon Guesser",
        description: "Guess skill & trait icons",
        icon: HelpCenter,
        content: IconGuesser,
    },
    "skill-viewer": {
        title: "Skill Viewer",
        description: "Edit & view custom skill tooltips",
        icon: ImageSearch,
        content: SkillViewer,
    },
};
