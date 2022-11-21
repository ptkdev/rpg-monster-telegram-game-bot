import logger from "@app/functions/utils/logger";
import telegram from "@routes/api/telegram";
import db from "@routes/api/database";
import type { CharacterInterface } from "@app/types/character.interfaces";
import translate from "@translations/translate";
import { InlineKeyboard } from "grammy";

const getUpdatedCharacterByStats = (role: string, character: CharacterInterface): CharacterInterface => {
	logger.info("getStats", "utils/set_role.ts:on(setStats)");

	switch (role) {
		case "dps":
		default:
			return {
				...character,
				role,
				attack: 10,
				defence: 5,
				health: 100,
				mana: 50,
			};

		case "tank":
			return {
				...character,
				role,
				attack: 5,
				defence: 10,
				health: 150,
				mana: 10,
			};

		case "healer":
			return {
				...character,
				role,
				attack: 4,
				defence: 8,
				health: 120,
				mana: 100,
			};
	}
};

/**
 * Set the role of the character
 * =====================
 * Set the specif role of the character when using the inlinke keyboard
 *
 * @param {any} ctx - ctx grammy
 * @param  {string} role - the selected role
 * @return {Promise<void>}
 */
const setRole = async (ctx: any, role: string): Promise<void> => {
	logger.info("setRole", "utils/set_role.ts:on(setRole)");

	let character: CharacterInterface = await db.character.get({
		username: telegram.api.message.getUsernameFromAction(ctx),
	});
	const lang = character.language_code;

	character = getUpdatedCharacterByStats(role, character);
	character.step = "done";

	await db.character.update({ id: character.id }, character);
	await telegram.api.message.send(
		ctx,
		telegram.api.message.getChatID(ctx),
		translate(lang || "it", "set_command_done", {
			username: telegram.api.message.getUsernameFromAction(ctx),
		}),
	);

	// Rimuove i bottoni
	await telegram.api.message.editMessageReplyMarkup(ctx, {
		reply_markup: new InlineKeyboard(),
	});
};

export { setRole };

export default setRole;
