import axios from "axios";
import logger from "@app/functions/utils/logger";
import config from "@app/configs/config";
import fs from "fs";

/**
 * Get the image from the url of telegram
 * =====================
 * Function that retrieve the image from the url of telegram
 *
 * @param  {string} url - the path of the image
 * @return {Promise<any>} image.
 */
async function getImage(url: string): Promise<any> {
	try {
		const response = await axios.get(`https://api.telegram.org/file/bot${config?.telegram?.token}/${url}`, {
			responseType: "arraybuffer",
		});
		return response.data;
	} catch (error) {
		logger.error(JSON.stringify(error || ""), "get_image.ts:getImage()");
		return null;
	}
}

/**
 * Save the image in the folder
 * =====================
 * Function that get and save the image in the folder
 *
 * @param  {string} url - the path of the image
 * @param  {string} user_id - the id of the user
 * @return {Promise<void>}
 */
async function saveImage(url: string, user_id: string): Promise<void> {
	const image: Buffer = await getImage(url);
	try {
		fs.writeFileSync(`app/images/characters/${user_id}.jpg`, image);
	} catch (error) {
		logger.error(JSON.stringify(error || ""), "get_image.ts:getAndSaveImage()");
	}
}

export { saveImage };
export default {
	saveImage,
};
