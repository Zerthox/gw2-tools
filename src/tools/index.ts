import { Whatshot, QueryStats, type SvgIconComponent, ImageSearch } from "@mui/icons-material";
import { CondiDurationCalculator } from "./condi-duration";
import { ProcCalculator } from "./procs";
import { SkillViewer } from "./skill-viewer";

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
    "skill-viewer": {
        title: "Skill Viewer",
        description: "Edit & view custom skill tooltips",
        icon: ImageSearch,
        content: SkillViewer,
    },
};
