import { GameSelect } from "./game-select";
import { loadData } from "./data";

export async function IconGuesser() {
    const data = await loadData();
    return <GameSelect data={data} />;
}
