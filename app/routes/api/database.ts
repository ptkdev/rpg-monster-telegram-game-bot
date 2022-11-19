/**
 * Migration script for the database.
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import connection from "@app/functions/api/database/connection";
import character from "@app/functions/api/database/character";
import settings from "@app/functions/api/database/settings";

const db = {
	connection: connection,
	character: character,
	settings: settings,
};

export { db };
export default db;
