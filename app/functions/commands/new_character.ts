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
		/* 	const users: MasterInterface = await db.users.get({
			id: telegram.api.message.getUserID(ctx),
		});

		if (users.id.toString() !== "0") {
			await db.users.update({ id: users.id }, telegram.api.message.getFullUser(ctx));
		} else {
			await db.users.add(telegram.api.message.getFullUser(ctx));
		} */

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
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "new_character_private", {
					bot_username: telegram.api.bot.getUsername(ctx),
				}),
			);
		}
	});
};

export { new_character };
export default new_character;
