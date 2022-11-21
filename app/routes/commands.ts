import start from "@app/functions/commands/start";
import launch from "@app/functions/commands/launch";
import settings from "@app/functions/commands/settings";
import version from "@app/functions/commands/version";
import new_character from "@app/functions/commands/new_character";
import set from "@app/functions/commands/set";
import pg from "@app/functions/commands/pg";
import hears from "@app/functions/commands/hears";
import hearsPhoto from "@app/functions/commands/hearsPhoto";

const commands = {
	start,
	launch,
	settings,
	version,
	new_character,
	set,
	pg,
	hears,
	hearsPhoto,
};

export { start, launch, settings, version, new_character, set, pg, hears, hearsPhoto };
export default commands;
