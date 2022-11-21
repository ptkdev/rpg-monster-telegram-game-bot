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
import { InlineKeyboard } from "grammy";
import bot from "@app/core/token";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";
import { CharacterInterface } from "@app/types/character.interfaces";
import { SettingsInterface } from "@app/types/settings.interfaces";

/**
 * command: /set
 * =====================
 * Change character values
 *
 */
const set = async (): Promise<void> => {
	bot.command("set", async (ctx) => {
		logger.info("command: /set", "set.ts:set()");
		const lang: SettingsInterface = await telegram.api.message.getLanguage(ctx);

		// is group
		if (telegram.api.message.getChatID(ctx) < 0) {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "command_in_group"),
			);
		} else {
			const buttons = new InlineKeyboard();

			buttons.text(translate(lang.language, "character_command_button_name"), "set_name");
			buttons.text(translate(lang.language, "character_command_button_avatar"), "set_picture");

			buttons.row();

			const options: any = {};
			options.reply_markup = buttons;
			const thread_id = telegram.api.message.getThreadID(ctx);
			if (thread_id) {
				options.message_thread_id = thread_id;
			}

			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "set_select_button"),
				options,
			);
		}
	});

	bot.callbackQuery(/^(set_\w*)$/, async (ctx) => {
		const character: CharacterInterface = await db.character.get({
			id: telegram.api.message.getUserIDFromAction(ctx),
		});

		const lang: string | undefined = character.language_code;

		character.step = ctx?.match?.[0] ?? "done";

		await db.character.update({ id: character.id }, character);

		if (character.step.startsWith("set_")) {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang || "it", `set_command_${character.step.replace("set_", "")}`),
			);
		}
	});
};

export { set };
export default set;
