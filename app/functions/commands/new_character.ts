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
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";
import newFunction from "@app/functions/utils/new/new.func";

/**
 * command: /new
 * =====================
 * Create new character
 *
 */
const new_character = async (): Promise<void> => {
	bot.command("new", async (ctx) => {
		logger.info("command: /start", "start.ts:start()");

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group chat
			const lang = await telegram.api.message.getLanguage(ctx);

			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "new_character_group", {
					bot_username: telegram.api.bot.getUsername(ctx),
				}),
			);
		} else {
			await newFunction(ctx);
		}
	});
};

export { new_character };
export default new_character;
