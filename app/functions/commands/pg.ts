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
import logger from "@app/functions/utils/logger";
import pgFunction from "@app/functions/utils/pg/pg.func";

/**
 * command: /character | /pg
 * =====================
 * Create new character
 *
 */
const pg = async (): Promise<void> => {
	bot.command(["pg", "character"], async (ctx) => {
		logger.info("command: /pg", "pg.ts:pg()");

		await pgFunction(ctx);
	});
};

export { pg };
export default pg;
