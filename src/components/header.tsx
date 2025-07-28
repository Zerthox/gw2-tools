import Link from "next/link";
import { AppBar, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { SettingsMenu } from "@/components/settings-menu";
import { NavigationMenu } from "@/components/navigation-menu";
import { site } from "@/metadata";

export interface HeaderProps {
    title?: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <NavigationMenu />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {title ?? "GW2 Tools"}
                    </Typography>
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
                </Toolbar>
            </Container>
        </AppBar>
    );
}
