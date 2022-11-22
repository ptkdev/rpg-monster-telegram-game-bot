/**
 * Character database
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Schema, model } from "mongoose";
import { logger } from "@app/functions/utils/logger";

import type { CharacterInterface } from "@app/types/character.interfaces";

const schema = new Schema<CharacterInterface>({
	id: { type: String, default: "0" },
	is_bot: { type: Boolean, default: false },
	first_name: { type: String, default: "" },
	username: { type: String, default: "" },
	character_name: { type: String, default: "" },
	language_code: { type: String, default: "en" },
	role: { type: String, default: "en" },
	attack: { type: Number, default: 0 },
	defence: { type: Number, default: 0 },
	health: { type: Number, default: 0 },
	mana: { type: Number, default: 0 },
	items: { type: Object, default: { potion: 0, superPotion: 0, resurrectionStone: 0 } },
	experience: { type: Number, default: 0 },
	group_id: { type: String, default: "0" },
	message_thread_id: { type: Number, default: 0 },
	step: { type: String, default: "done" },
});

const query = model<CharacterInterface>("Character", schema, "character");

/**
 * Chracter CRUD
 * =====================
 * Add character to DB
 *
 * @param {CharacterInterface} character - character to add
 */
const add = async (character: CharacterInterface): Promise<void> => {
	try {
		const doc = new query(character);
		await doc.save();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "character.ts:add()");
	}
};

/**
 * Character CRUD
 * =====================
 * Remove character from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id: "123"}
 */
const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		await query.findOneAndDelete(search);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "character.ts:remove()");
	}
};

/**
 * Character CRUD
 * =====================
 * Update character from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id: "123"}
 * @param {CharacterInterface} character - data to update
 */
const update = async (
	search: Record<string, number | string | boolean>,
	character: CharacterInterface,
): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, character);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "character.ts:update()");
	}
};

/**
 * Master CRUD
 * =====================
 * Get character from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {CharacterInterface} character.
 */
const get = async (search: Record<string, number | string | boolean>): Promise<CharacterInterface> => {
	try {
		const character = query.findOne(search, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "character.ts:get()");
			}
		});

		return (await character.lean()) || new query().toJSON();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "character.ts:get()");
	}

	return new query().toJSON();
};

/**
 * Character CRUD
 * =====================
 * Get multiple characters from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {CharacterInterface[]} characters.

 */
const getMultiple = async (search: Record<string, number | string | boolean>): Promise<CharacterInterface[]> => {
	try {
		const characters = await query.find(search, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "character.ts:getMultiple()");
			}
		});
		return (await characters) || [];
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "character.ts:getMultiple()");
	}

	return [];
};

export { get, update, remove, add, getMultiple };
export default { get, update, remove, add, getMultiple };
