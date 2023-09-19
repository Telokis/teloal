import * as cheerio from "cheerio";
import { chunk } from "lodash";
import { ClassKey } from "typed-adventureland";
import { sleep } from "@teloal/helpers";
import { AlCharacter } from "./models";

export async function parseCharacters(html: string): Promise<Array<AlCharacter>> {
  const $ = cheerio.load(html);

  if ($("td").text() === "Not Found") {
    return [];
  }

  const data = chunk($("body > table > tbody > tr > td").children(), 2);

  const infos: Array<AlCharacter> = [];

  for (const [script, div] of data) {
    const slots = JSON.parse(
      $(script)
        .text()
        .trim()
        .replace(/^[^{]+?(\{.*?\});$/i, "$1"),
    );

    const charInfos = $(div).children("div").find("div");

    const name = $(charInfos[0]).text().split(":").pop()!.trim();
    const ctype = $(charInfos[1]).text().split(":").pop()!.trim().toLowerCase() as ClassKey;
    const level = parseInt($(charInfos[2]).text().split(":").pop()!.trim(), 10);

    infos.push(new AlCharacter({ name, ctype, level, slots }));

    await sleep(1);
  }

  return infos;
}
