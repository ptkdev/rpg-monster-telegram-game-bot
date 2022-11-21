/**
 * Set
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
import { SettingsInterface } from "@app/types/settings.interfaces";
import { setFunction, setCallbackQuery } from "@app/functions/utils/set/set.func";
/**
 * command: /set
 * =====================
 * Change character values
 *
 */
const set = async (): Promise<void> => {
	bot.command("set", async (ctx) => {
		logger.info("command: /set", "set.ts:set()");
		// is group
		if (telegram.api.message.getChatID(ctx) < 0) {
			const lang: SettingsInterface = await telegram.api.message.getLanguage(ctx);

			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "command_in_group"),
			);
		} else {
			// is private chat
			await setFunction(ctx);
		}
	});

	bot.callbackQuery(/^(set_\w*)$/, async (ctx) => {
		await setCallbackQuery(ctx);
	});
};

export { set };
export default set;
