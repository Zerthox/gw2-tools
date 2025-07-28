import Link from "next/link";
import { Content } from "@/components/content";
import { tools } from "@/tools";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function Home() {
    return (
        <Content>
            {Object.entries(tools).map(([id, { title, description, icon: Icon }], i) => (
                <ListItem key={i}>
                    <ListItemButton href={"/tools/" + id} LinkComponent={Link}>
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText primary={title} secondary={description} />
                    </ListItemButton>
                </ListItem>
            ))}
        </Content>
    );
}
