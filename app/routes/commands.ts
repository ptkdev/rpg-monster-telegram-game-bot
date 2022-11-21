import start from "@app/functions/commands/start";
import master from "@app/functions/commands/master";
import groups from "@app/functions/commands/groups";
import launch from "@app/functions/commands/launch";
import hears from "@app/functions/commands/hears";
import hearsPhoto from "@app/functions/commands/hearsphoto";
import settings from "@app/functions/commands/settings";
import actions from "@app/functions/commands/actions";
import version from "@app/functions/commands/version";
import new_character from "@app/functions/commands/new_character";
import set from "@app/functions/commands/set";

const commands = {
	start,
	master,
	groups,
	launch,
	hears,
	settings,
	hearsPhoto,
	actions,
	version,
	new_character,
	set,
};

export { start, master, groups, launch, hears, settings, hearsPhoto, actions, version, new_character, set };
export default commands;
