import { Content } from "@/components/content";
import { Link } from "@/components/link";
import { tools } from "@/tools";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function Home() {
    return (
        <Content>
            {Object.entries(tools).map(([id, { title, description, icon: Icon }]) => (
                <ListItem key={id}>
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
