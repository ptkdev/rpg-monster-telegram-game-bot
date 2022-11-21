import translate from "@translations/translate";
import telegram from "@routes/api/telegram";
import { InlineKeyboard } from "grammy";
import { CharacterInterface } from "@app/types/character.interfaces";
import db from "@routes/api/database";
import { SettingsInterface } from "@app/types/settings.interfaces";

const setFunction = async (ctx: any): Promise<void> => {
	const lang: SettingsInterface = await telegram.api.message.getLanguage(ctx);
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
};

const setCallbackQuery = async (ctx: any): Promise<void> => {
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
};

export { setFunction, setCallbackQuery };
export default { setFunction, setCallbackQuery };
