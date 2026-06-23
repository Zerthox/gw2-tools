"use client";

import { Link } from "@/components/link";
import { IconButton, Tooltip } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { SettingsMenu } from "@/components/settings-menu";
import { site } from "@/metadata";

export function HeaderButtons() {
    return (
        <>
            <Tooltip title="GitHub" placement="bottom" disableInteractive>
                <IconButton
                    href={site.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    LinkComponent={Link}
                >
                    <GitHub />
                </IconButton>
            </Tooltip>
            <SettingsMenu />
        </>
    );
}
