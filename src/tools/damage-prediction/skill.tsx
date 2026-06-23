import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { SkillInfo } from ".";

export function Skill({ id, name, icon }: SkillInfo) {
    const size = "1.5em";

    return (
        <Stack direction="row" spacing={1}>
            {icon && <Box component="img" src={icon} alt={name} width={size} height={size} />}
            <Tooltip title={id}>
                <Typography>{name}</Typography>
            </Tooltip>
        </Stack>
    );
}
