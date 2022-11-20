import axios from "axios";
import logger from "@app/functions/utils/logger";
import config from "@app/configs/config";
import fs from "fs";
import path from "path";

async function getImage(path: string): Promise<any> {
	try {
		const response = await axios.get(`https://api.telegram.org/file/bot${config?.telegram?.token}/${path}`, {
			responseType: "arraybuffer",
		});
		return response.data;
	} catch (error) {
		logger.error(JSON.stringify(error || ""), "get_image.ts:getImage()");
		return null;
	}
}

async function getAndSaveImage(url: string, user_id: string): Promise<any> {
	const image: Buffer = await getImage(url);
	try {
		fs.writeFileSync(`app/images/characters/${user_id}.jpg`, image);
	} catch (error) {
		logger.error(JSON.stringify(error || ""), "get_image.ts:getAndSaveImage()");
		return null;
	}
}

export { getAndSaveImage };
export default {
	getAndSaveImage,
};
