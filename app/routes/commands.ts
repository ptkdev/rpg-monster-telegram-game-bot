import start from "@app/functions/commands/start";
import launch from "@app/functions/commands/launch";
import settings from "@app/functions/commands/settings";
import version from "@app/functions/commands/version";
import new_character from "@app/functions/commands/new_character";
import set from "@app/functions/commands/set";
import pg from "@app/functions/commands/pg";

const commands = {
	start,
	launch,
	settings,
	version,
	new_character,
	set,
	pg,
};

export { start, launch, settings, version, new_character, set, pg };
export default commands;
