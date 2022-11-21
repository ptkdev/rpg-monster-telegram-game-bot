/**
 * Grammy Hears
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import { InlineKeyboard } from "grammy";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";
import { saveImage } from "@app/functions/utils/save_image";
import { setRole } from "@app/functions/utils/set_role";
import type { CharacterInterface } from "@app/types/character.interfaces";

/**
 * hearsPhoto: any photo from bot chat
 * =====================
 * Listen any photo user send
 *
 */
const hearsPhoto = async (): Promise<void> => {
	bot.on("message:photo", async (ctx) => {
		logger.info("hears: photo", "hearsphoto.ts:on(photo)");
		const lang = await telegram.api.message.getLanguage(ctx);

		if (telegram.api.message.getChatID(ctx) > 0) {
			// is chat with bot
			const character: CharacterInterface = await db.character.get({
				username: telegram.api.message.getUsername(ctx),
			});

			if (character.id.toString() !== "0" && character.step !== "done") {
				const photoInfo: any = await telegram.api.message.getPhotoInfo(ctx);

				switch (character.step) {
					case "picture":
					case "set_picture":
						if (photoInfo?.file_size > 20971520) {
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_photo_size", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
							return;
						}

						await saveImage(photoInfo?.file_path, character.id.toString());

						if (character.step.toString() === "set_picture") {
							character.step = "done";

							await db.character.update({ id: character.id }, character);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							character.step = "role";

							await db.character.update({ id: character.id }, character);

							const buttons = new InlineKeyboard();
							buttons.text(`🔥 DPS`, "dps").row();
							buttons.text(`🧽 TANK`, "tank").row();
							buttons.text(`💉 HEALER`, "healer").row();

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_role"),
								{
									reply_markup: buttons,
									message_thread_id: character.message_thread_id,
								},
							);
						}

						break;
				}
			}
		}

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group
		}
	});
};

bot.callbackQuery(["dps", "tank", "healer"], async (ctx) => {
	logger.info("callbackQuery: dps/tank/healer", "hearsphoto.ts:on(dps/tank/healer)");
	await setRole(ctx, telegram.api.message.getActionType(ctx));
});

export { hearsPhoto };
export default hearsPhoto;
