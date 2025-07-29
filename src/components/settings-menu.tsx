"use client";

import { useCallback, useState } from "react";
import {
    Box,
    Divider,
    Drawer,
    FormControl,
    FormLabel,
    IconButton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
    useColorScheme,
} from "@mui/material";
import { Close, DarkMode, LightMode, Settings, SettingsBrightness } from "@mui/icons-material";

export function SettingsMenu() {
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(() => setOpen(true), [setOpen]);
    const toggleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
        <>
            <Tooltip title="Settings" placement="top" disableInteractive>
                <IconButton onClick={toggleOpen}>
                    <Settings />
                </IconButton>
            </Tooltip>
            <Drawer anchor="right" open={open} onClose={toggleClose}>
                <Box padding={1}>
                    <Stack direction="row" alignItems="center" padding={1}>
                        <Typography variant="h5">Settings</Typography>
                        <IconButton sx={{ ml: "auto" }} onClick={toggleClose}>
                            <Close />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Box padding={3}>
                        <SettingsContent />
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export function SettingsContent() {
    return <ThemeSelect />;
}

export function ThemeSelect() {
    const { mode, setMode } = useColorScheme();
    const themes = [
        {
            name: "System",
            value: "system",
            Icon: SettingsBrightness,
        },
        {
            name: "Dark",
            value: "dark",
            Icon: DarkMode,
        },
        {
            name: "Light",
            value: "light",
            Icon: LightMode,
        },
    ];

    return (
        <FormControl>
            <FormLabel>Theme</FormLabel>
            <ToggleButtonGroup exclusive value={mode} onChange={(_, value) => setMode(value)}>
                {themes.map(({ name, value, Icon }) => (
                    <Tooltip key={value} title={name} arrow>
                        <ToggleButton value={value}>
                            <Icon />
                        </ToggleButton>
                    </Tooltip>
                ))}
            </ToggleButtonGroup>
        </FormControl>
    );
}
