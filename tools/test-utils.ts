import { GData } from "typed-adventureland";
import got from "got";

let G: GData;

export async function getGData(): Promise<GData> {
  if (G) {
    return G;
  }

  const gData = await got("https://teloalapi.telokis.fr/v1/al/data").json<GData>();

  G = gData;

  return G;
}
