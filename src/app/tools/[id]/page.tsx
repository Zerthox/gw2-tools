import { Content } from "@/components/content";
import { tools } from "@/tools";

interface ToolParams {
    id: string;
}

export async function generateStaticParams(): Promise<ToolParams[]> {
    return Object.keys(tools).map((id) => ({ id }));
}

interface ToolProps {
    params: Promise<ToolParams>;
}

export default async function Tool({ params }: ToolProps) {
    const { id } = await params;
    const tool = tools[id];
    const Body = tool.content;
    return (
        <Content title={tool.title}>
            <Body />
        </Content>
    );
}
