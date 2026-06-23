import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { NavigationMenu } from "@/components/navigation-menu";
import { HeaderButtons } from "./header-buttons";

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
                    <HeaderButtons />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
