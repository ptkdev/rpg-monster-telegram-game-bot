/**
 * Show character
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
import generateCard from "@app/functions/utils/generate_character_card";
import type { CharacterInterface } from "@app/types/character.interfaces";
import { InputFile } from "grammy";

/**
 * command: /character | /pg
 * =====================
 * Create new character
 *
 */
const pg = async (): Promise<void> => {
	bot.command(["pg", "character"], async (ctx) => {
		logger.info("command: /pg", "pg.ts:pg()");
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
	});
};

export { pg };
export default pg;
