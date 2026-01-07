import { Game } from "./game";
import { loadData } from "./data";

export async function IconGuesser() {
    const data = await loadData();
    return <Game data={data} />;
}
