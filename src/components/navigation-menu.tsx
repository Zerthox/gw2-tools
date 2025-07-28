"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { Close, Construction, Menu } from "@mui/icons-material";
import { tools } from "@/tools";

export function NavigationMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <Menu />
            </IconButton>
            <Drawer variant="temporary" open={open} onClose={() => setOpen(false)}>
                <Box padding={1}>
                    <Stack direction="row" alignItems="center" padding={1}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            href="/"
                            component={Link}
                            sx={{ fontWeight: 600, color: "inherit", textDecoration: "none" }}
                        >
                            <Construction sx={{ color: "inherit", mr: 1 }} />
                            <Typography variant="h5" noWrap>
                                GW2 Tools
                            </Typography>
                        </Stack>
                        <IconButton sx={{ ml: "auto" }} onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </Stack>
                    <Divider />
                    {Object.entries(tools).map(([path, { title, description, icon: Icon }]) => (
                        <ListItem disablePadding key={path}>
                            <ListItemButton href={"/tools/" + path} LinkComponent={Link}>
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={title} secondary={description} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <List></List>
                </Box>
            </Drawer>
        </>
    );
}
