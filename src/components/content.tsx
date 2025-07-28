import { Card, Container } from "@mui/material";
import { Header } from "./header";

export interface ContentProps {
    title?: string;
    children: React.ReactNode;
}

export function Content({ title, children }: ContentProps) {
    return (
        <>
            <Header title={title} />
            <Container maxWidth="lg">
                <Card sx={{ padding: 2, marginY: 2 }}>{children}</Card>
            </Container>
        </>
    );
}
