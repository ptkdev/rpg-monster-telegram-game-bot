import { InputFile } from "grammy";
import type { CharacterInterface } from "@app/types/character.interfaces";
import generateCard from "@app/functions/utils/pg/generate_character_card";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";

const pgFunction = async (ctx: any): Promise<void> => {
	const lang = await telegram.api.message.getLanguage(ctx);

	if (telegram.api.message.getUsername(ctx) !== "") {
		const character: CharacterInterface = await db.character.get({
			id: telegram.api.message.getUserID(ctx),
		});

		const card = await generateCard(character);
		await telegram.api.message.sendPhoto(ctx, character.group_id, new InputFile(card));
	} else {
		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			translate(lang.language, "new_character_no_username"),
		);
	}
};

export { pgFunction };
export default pgFunction;
