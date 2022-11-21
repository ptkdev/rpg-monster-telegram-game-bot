/**
 * Grammy Hears
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

import bot from "@app/core/token";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";

import type { CharacterInterface } from "@app/types/character.interfaces";

/**
 * hears: any taxt from bot chat
 * =====================
 * Listen any text user write
 *
 */
const hears = async (): Promise<void> => {
	bot.on("message:text", async (ctx) => {
		logger.info("hears: text", "hears.ts:on(text)");
		const lang = await telegram.api.message.getLanguage(ctx);

		if (telegram.api.message.getChatID(ctx) > 0) {
			// is chat with bot
			const character: CharacterInterface = await db.character.get({
				username: telegram.api.message.getUsername(ctx),
			});

			if (character.id.toString() !== "0" && character.step !== "done") {
				const text = telegram.api.message.getText(ctx);

				// SET NAME
				switch (character.step) {
					case "name":
					case "set_name":
						// TODO  Validare il nome del personaggio con qualche regex
						character.character_name = text;

						if (character.step.toString() === "set_name") {
							character.step = "done";

							await db.character.update({ id: character.id }, character);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							character.step = "picture";

							await db.character.update({ id: character.id }, character);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_picture"),
							);
						}

						break;
				}
			}
		}

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group
		}
	});
};

export { hears };
export default hears;
