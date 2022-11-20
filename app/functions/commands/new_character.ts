/**
 * New character
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
 * command: /new
 * =====================
 * Create new character
 *
 */
const new_character = async (): Promise<void> => {
	bot.command("new", async (ctx) => {
		logger.info("command: /start", "start.ts:start()");
		const lang = await telegram.api.message.getLanguage(ctx);

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group chat
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "new_character_group", {
					bot_username: telegram.api.bot.getUsername(ctx),
				}),
			);
		} else {
			if (telegram.api.message.getUsername(ctx) !== "") {
				const character: CharacterInterface = await db.character.get({
					id: telegram.api.message.getUserID(ctx),
				});

				if (character.id.toString() !== "0") {
					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "new_character_already_exist"),
					);
				} else {
					const pg = {
						...telegram.api.message.getFullUser(ctx),
						step: "name",
					};
					await db.character.add(pg);

					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "new_character_private"),
					);
				}
			} else {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "new_character_no_username"),
				);
			}
		}
	});
};

export { new_character };
export default new_character;
