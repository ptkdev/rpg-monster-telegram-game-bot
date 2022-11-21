import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import type { CharacterInterface } from "@app/types/character.interfaces";
import translate from "@translations/translate";

const newFunction = async (ctx: any): Promise<void> => {
	const lang = await telegram.api.message.getLanguage(ctx);

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
};

export { newFunction };

export default newFunction;
