import { CharacterInterface } from "@app/types/character.interfaces";
import canvas, { registerFont } from "canvas"; // For canvas.
import translate from "@translations/translate";
registerFont("app/fonts/Inter-Regular.ttf", { family: "InterBold" });

// Level Generator
/* const levels: number[] = [];
for (let i = 1; i < 1001; i++) {
	const multiplier = Math.ceil(i * (i * 15));
	levels.push(100 * i + (i === 1 ? 0 : multiplier));
}

console.log(JSON.stringify(levels)); */

interface ColorsInterface {
	gradientColor1: string;
	gradientColor2: string;
	color1: string;
	color2: string;
	color3: string;
}

const xps = [
	100, 260, 435, 640, 875, 1140, 1435, 1760, 2115, 2500, 2915, 3360, 3835, 4340, 4875, 5440, 6035, 6660, 7315, 8000,
	8715, 9460, 10235, 11040, 11875, 12740, 13635, 14560, 15515, 16500, 17515, 18560, 19635, 20740, 21875, 23040, 24235,
	25460, 26715, 28000, 29315, 30660, 32035, 33440, 34875, 36340, 37835, 39360, 40915, 42500, 44115, 45760, 47435,
	49140, 50875, 52640, 54435, 56260, 58115, 60000, 61915, 63860, 65835, 67840, 69875, 71940, 74035, 76160, 78315,
	80500, 82715, 84960, 87235, 89540, 91875, 94240, 96635, 99060, 101515, 104000, 106515, 109060, 111635, 114240,
	116875, 119540, 122235, 124960, 127715, 130500, 133315, 136160, 139035, 141940, 144875, 147840, 150835, 153860,
	156915, 160000, 163115, 166260, 169435, 172640, 175875, 179140, 182435, 185760, 189115, 192500, 195915, 199360,
	202835, 206340, 209875, 213440, 217035, 220660, 224315, 228000, 231715, 235460, 239235, 243040, 246875, 250740,
	254635, 258560, 262515, 266500, 270515, 274560, 278635, 282740, 286875, 291040, 295235, 299460, 303715, 308000,
	312315, 316660, 321035, 325440, 329875, 334340, 338835, 343360, 347915, 352500, 357115, 361760, 366435, 371140,
	375875, 380640, 385435, 390260, 395115, 400000, 404915, 409860, 414835, 419840, 424875, 429940, 435035, 440160,
	445315, 450500, 455715, 460960, 466235, 471540, 476875, 482240, 487635, 493060, 498515, 504000, 509515, 515060,
	520635, 526240, 531875, 537540, 543235, 548960, 554715, 560500, 566315, 572160, 578035, 583940, 589875, 595840,
	601835, 607860, 613915, 620000, 626115, 632260, 638435, 644640, 650875, 657140, 663435, 669760, 676115, 682500,
	688915, 695360, 701835, 708340, 714875, 721440, 728035, 734660, 741315, 748000, 754715, 761460, 768235, 775040,
	781875, 788740, 795635, 802560, 809515, 816500, 823515, 830560, 837635, 844740, 851875, 859040, 866235, 873460,
	880715, 888000, 895315, 902660, 910035, 917440, 924875, 932340, 939835, 947360, 954915, 962500, 970115, 977760,
	985435, 993140, 1000875, 1008640, 1016435, 1024260, 1032115, 1040000, 1047915, 1055860, 1063835, 1071840, 1079875,
	1087940, 1096035, 1104160, 1112315, 1120500, 1128715, 1136960, 1145235, 1153540, 1161875, 1170240, 1178635, 1187060,
	1195515, 1204000, 1212515, 1221060, 1229635, 1238240, 1246875, 1255540, 1264235, 1272960, 1281715, 1290500, 1299315,
	1308160, 1317035, 1325940, 1334875, 1343840, 1352835, 1361860, 1370915, 1380000, 1389115, 1398260, 1407435, 1416640,
	1425875, 1435140, 1444435, 1453760, 1463115, 1472500, 1481915, 1491360, 1500835, 1510340, 1519875, 1529440, 1539035,
	1548660, 1558315, 1568000, 1577715, 1587460, 1597235, 1607040, 1616875, 1626740, 1636635, 1646560, 1656515, 1666500,
	1676515, 1686560, 1696635, 1706740, 1716875, 1727040, 1737235, 1747460, 1757715, 1768000, 1778315, 1788660, 1799035,
	1809440, 1819875, 1830340, 1840835, 1851360, 1861915, 1872500, 1883115, 1893760, 1904435, 1915140, 1925875, 1936640,
	1947435, 1958260, 1969115, 1980000, 1990915, 2001860, 2012835, 2023840, 2034875, 2045940, 2057035, 2068160, 2079315,
	2090500, 2101715, 2112960, 2124235, 2135540, 2146875, 2158240, 2169635, 2181060, 2192515, 2204000, 2215515, 2227060,
	2238635, 2250240, 2261875, 2273540, 2285235, 2296960, 2308715, 2320500, 2332315, 2344160, 2356035, 2367940, 2379875,
	2391840, 2403835, 2415860, 2427915, 2440000, 2452115, 2464260, 2476435, 2488640, 2500875, 2513140, 2525435, 2537760,
	2550115, 2562500, 2574915, 2587360, 2599835, 2612340, 2624875, 2637440, 2650035, 2662660, 2675315, 2688000, 2700715,
	2713460, 2726235, 2739040, 2751875, 2764740, 2777635, 2790560, 2803515, 2816500, 2829515, 2842560, 2855635, 2868740,
	2881875, 2895040, 2908235, 2921460, 2934715, 2948000, 2961315, 2974660, 2988035, 3001440, 3014875, 3028340, 3041835,
	3055360, 3068915, 3082500, 3096115, 3109760, 3123435, 3137140, 3150875, 3164640, 3178435, 3192260, 3206115, 3220000,
	3233915, 3247860, 3261835, 3275840, 3289875, 3303940, 3318035, 3332160, 3346315, 3360500, 3374715, 3388960, 3403235,
	3417540, 3431875, 3446240, 3460635, 3475060, 3489515, 3504000, 3518515, 3533060, 3547635, 3562240, 3576875, 3591540,
	3606235, 3620960, 3635715, 3650500, 3665315, 3680160, 3695035, 3709940, 3724875, 3739840, 3754835, 3769860, 3784915,
	3800000, 3815115, 3830260, 3845435, 3860640, 3875875, 3891140, 3906435, 3921760, 3937115, 3952500, 3967915, 3983360,
	3998835, 4014340, 4029875, 4045440, 4061035, 4076660, 4092315, 4108000, 4123715, 4139460, 4155235, 4171040, 4186875,
	4202740, 4218635, 4234560, 4250515, 4266500, 4282515, 4298560, 4314635, 4330740, 4346875, 4363040, 4379235, 4395460,
	4411715, 4428000, 4444315, 4460660, 4477035, 4493440, 4509875, 4526340, 4542835, 4559360, 4575915, 4592500, 4609115,
	4625760, 4642435, 4659140, 4675875, 4692640, 4709435, 4726260, 4743115, 4760000, 4776915, 4793860, 4810835, 4827840,
	4844875, 4861940, 4879035, 4896160, 4913315, 4930500, 4947715, 4964960, 4982235, 4999540, 5016875, 5034240, 5051635,
	5069060, 5086515, 5104000, 5121515, 5139060, 5156635, 5174240, 5191875, 5209540, 5227235, 5244960, 5262715, 5280500,
	5298315, 5316160, 5334035, 5351940, 5369875, 5387840, 5405835, 5423860, 5441915, 5460000, 5478115, 5496260, 5514435,
	5532640, 5550875, 5569140, 5587435, 5605760, 5624115, 5642500, 5660915, 5679360, 5697835, 5716340, 5734875, 5753440,
	5772035, 5790660, 5809315, 5828000, 5846715, 5865460, 5884235, 5903040, 5921875, 5940740, 5959635, 5978560, 5997515,
	6016500, 6035515, 6054560, 6073635, 6092740, 6111875, 6131040, 6150235, 6169460, 6188715, 6208000, 6227315, 6246660,
	6266035, 6285440, 6304875, 6324340, 6343835, 6363360, 6382915, 6402500, 6422115, 6441760, 6461435, 6481140, 6500875,
	6520640, 6540435, 6560260, 6580115, 6600000, 6619915, 6639860, 6659835, 6679840, 6699875, 6719940, 6740035, 6760160,
	6780315, 6800500, 6820715, 6840960, 6861235, 6881540, 6901875, 6922240, 6942635, 6963060, 6983515, 7004000, 7024515,
	7045060, 7065635, 7086240, 7106875, 7127540, 7148235, 7168960, 7189715, 7210500, 7231315, 7252160, 7273035, 7293940,
	7314875, 7335840, 7356835, 7377860, 7398915, 7420000, 7441115, 7462260, 7483435, 7504640, 7525875, 7547140, 7568435,
	7589760, 7611115, 7632500, 7653915, 7675360, 7696835, 7718340, 7739875, 7761440, 7783035, 7804660, 7826315, 7848000,
	7869715, 7891460, 7913235, 7935040, 7956875, 7978740, 8000635, 8022560, 8044515, 8066500, 8088515, 8110560, 8132635,
	8154740, 8176875, 8199040, 8221235, 8243460, 8265715, 8288000, 8310315, 8332660, 8355035, 8377440, 8399875, 8422340,
	8444835, 8467360, 8489915, 8512500, 8535115, 8557760, 8580435, 8603140, 8625875, 8648640, 8671435, 8694260, 8717115,
	8740000, 8762915, 8785860, 8808835, 8831840, 8854875, 8877940, 8901035, 8924160, 8947315, 8970500, 8993715, 9016960,
	9040235, 9063540, 9086875, 9110240, 9133635, 9157060, 9180515, 9204000, 9227515, 9251060, 9274635, 9298240, 9321875,
	9345540, 9369235, 9392960, 9416715, 9440500, 9464315, 9488160, 9512035, 9535940, 9559875, 9583840, 9607835, 9631860,
	9655915, 9680000, 9704115, 9728260, 9752435, 9776640, 9800875, 9825140, 9849435, 9873760, 9898115, 9922500, 9946915,
	9971360, 9995835, 10020340, 10044875, 10069440, 10094035, 10118660, 10143315, 10168000, 10192715, 10217460,
	10242235, 10267040, 10291875, 10316740, 10341635, 10366560, 10391515, 10416500, 10441515, 10466560, 10491635,
	10516740, 10541875, 10567040, 10592235, 10617460, 10642715, 10668000, 10693315, 10718660, 10744035, 10769440,
	10794875, 10820340, 10845835, 10871360, 10896915, 10922500, 10948115, 10973760, 10999435, 11025140, 11050875,
	11076640, 11102435, 11128260, 11154115, 11180000, 11205915, 11231860, 11257835, 11283840, 11309875, 11335940,
	11362035, 11388160, 11414315, 11440500, 11466715, 11492960, 11519235, 11545540, 11571875, 11598240, 11624635,
	11651060, 11677515, 11704000, 11730515, 11757060, 11783635, 11810240, 11836875, 11863540, 11890235, 11916960,
	11943715, 11970500, 11997315, 12024160, 12051035, 12077940, 12104875, 12131840, 12158835, 12185860, 12212915,
	12240000, 12267115, 12294260, 12321435, 12348640, 12375875, 12403140, 12430435, 12457760, 12485115, 12512500,
	12539915, 12567360, 12594835, 12622340, 12649875, 12677440, 12705035, 12732660, 12760315, 12788000, 12815715,
	12843460, 12871235, 12899040, 12926875, 12954740, 12982635, 13010560, 13038515, 13066500, 13094515, 13122560,
	13150635, 13178740, 13206875, 13235040, 13263235, 13291460, 13319715, 13348000, 13376315, 13404660, 13433035,
	13461440, 13489875, 13518340, 13546835, 13575360, 13603915, 13632500, 13661115, 13689760, 13718435, 13747140,
	13775875, 13804640, 13833435, 13862260, 13891115, 13920000, 13948915, 13977860, 14006835, 14035840, 14064875,
	14093940, 14123035, 14152160, 14181315, 14210500, 14239715, 14268960, 14298235, 14327540, 14356875, 14386240,
	14415635, 14445060, 14474515, 14504000, 14533515, 14563060, 14592635, 14622240, 14651875, 14681540, 14711235,
	14740960, 14770715, 14800500, 14830315, 14860160, 14890035, 14919940, 14949875, 14979840, 15009835, 15039860,
	15069915, 15100000,
];

const getColorByRole = (role: string | undefined): ColorsInterface => {
	switch (role) {
		case "dps":
		default:
			return {
				gradientColor1: "#6e00ff",
				gradientColor2: "#8e48c7",
				color1: "#ffffff",
				color2: "#000000",
				color3: "#02d032",
			};
		case "tank":
			return {
				gradientColor1: "#6e00ff",
				gradientColor2: "#8e48c7",
				color1: "#ffffff",
				color2: "#000000",
				color3: "#02d032",
			};

		case "healer":
			return {
				gradientColor1: "#6e00ff",
				gradientColor2: "#8e48c7",
				color1: "#ffffff",
				color2: "#000000",
				color3: "#02d032",
			};
	}
};

const generateBackground = async (ctx: any, { gradientColor1, gradientColor2 }: ColorsInterface): Promise<void> => {
	// Aggiunge il gradiente
	const grd = ctx.createLinearGradient(0, 853, 1352, 0);
	grd.addColorStop(0, gradientColor1);
	grd.addColorStop(1, gradientColor2);
	ctx.fillStyle = grd;
	// Filla il gradiente
	ctx.fillRect(0, 0, 1342, 853);
};

const generateText = (
	ctx,
	{ character_name, role, experience, username, language_code, attack, defence, mana, health }: CharacterInterface,
	{ color1, color2, color3 }: ColorsInterface,
	currentLevelIndex: number,
): void => {
	// Aggiunge il livello
	ctx.font = "70px InterBold";
	ctx.fillStyle = color1;

	const numberLevelWidth = ctx.measureText(currentLevelIndex).width;

	ctx.fillText(currentLevelIndex, 1270 - numberLevelWidth, 110);

	// Aggiunge la LABEL per il livello
	ctx.font = "40px InterBold";
	ctx.fillStyle = color1;

	const translatedLevelLabel = translate(language_code || "it", "generate_card_level_label");
	const levelLabelWidth = ctx.measureText(translatedLevelLabel).width;

	ctx.fillText(translatedLevelLabel, 1270 - numberLevelWidth - levelLabelWidth - 10, 110);

	// Aggiunge il ruolo
	ctx.font = "70px InterBold";
	ctx.fillStyle = color2;

	const roleWidth = ctx.measureText(role).width;

	ctx.fillText(role, 1270 - numberLevelWidth - levelLabelWidth - roleWidth - 40, 110);

	// Aggiunge la LABEL per il ruolo
	ctx.font = "40px InterBold";
	ctx.fillStyle = color2;

	const translatedRankLabel = translate(language_code || "it", "generate_card_role_label");
	const rankLabelWidth = ctx.measureText(translatedRankLabel).width;

	ctx.fillText(translatedRankLabel, 1270 - numberLevelWidth - levelLabelWidth - roleWidth - rankLabelWidth - 60, 110);

	// /////////// /////////

	// Aggiunge il nome del personaggio
	ctx.font = "58px InterBold";
	ctx.fillStyle = color2;
	ctx.fillText(character_name, 385, 250);

	const characterNameWidth = ctx.measureText(character_name).width;

	// Aggiunge l'username
	ctx.font = "38px InterBold";
	ctx.fillStyle = color3;

	ctx.fillText(`@${username}`, 385 + characterNameWidth + 12, 250);

	// Aggiunge l'esperienza necessaria per il prossimo livello
	ctx.font = "38px InterBold";
	ctx.fillStyle = color3;

	const xpNeededWidth = ctx.measureText(`/ ${xps[currentLevelIndex]} XP`).width;

	ctx.fillText(`/ ${xps[currentLevelIndex]} XP`, 1260 - xpNeededWidth, 250);

	ctx.font = "38px InterBold";
	ctx.fillStyle = color2;

	const currentXpWidth = ctx.measureText(experience).width;

	ctx.fillText(experience, 1260 - xpNeededWidth - currentXpWidth - 20, 250);

	// Aggiunge la label per la stat attacco
	ctx.font = "58px InterBold";
	ctx.fillStyle = color2;

	const translatedAttackLabel = translate(language_code || "it", "generate_card_attack_label");
	const attackLabelWidth = ctx.measureText(translatedAttackLabel).width;

	ctx.fillText(translatedAttackLabel, 40, 500);

	// Aggiunge l'attacco
	ctx.font = "58px InterBold";
	ctx.fillStyle = color1;

	ctx.fillText(attack.toString(), 40 + attackLabelWidth + 20, 500);

	// Aggiunge la vita
	ctx.font = "58px InterBold";
	ctx.fillStyle = color1;

	const healthWidth = ctx.measureText(health.toString()).width;

	ctx.fillText(health.toString(), 1260 - healthWidth, 500);

	// Aggiunge la label per la stat vita
	ctx.font = "58px InterBold";
	ctx.fillStyle = color2;

	const translatedHealthLabel = translate(language_code || "it", "generate_card_health_label");
	const healthLabelWidth = ctx.measureText(translatedHealthLabel).width;

	ctx.fillText(translatedHealthLabel, 1260 - healthWidth - healthLabelWidth - 20, 500);

	// NUOVA RIGA

	// Aggiunge la label per la stat difesa
	ctx.font = "58px InterBold";
	ctx.fillStyle = color2;

	const translatedDefenceLabel = translate(language_code || "it", "generate_card_defence_label");
	const defenceLabelWidth = ctx.measureText(translatedDefenceLabel).width;

	ctx.fillText(translatedDefenceLabel, 40, 600);

	// Aggiunge la difesa
	ctx.font = "58px InterBold";
	ctx.fillStyle = color1;

	ctx.fillText(defence.toString(), 40 + defenceLabelWidth + 20, 600);

	// Aggiunge il mana
	ctx.font = "58px InterBold";
	ctx.fillStyle = color1;

	const manaWidth = ctx.measureText(mana.toString()).width;

	ctx.fillText(mana.toString(), 1260 - manaWidth, 600);

	// Aggiunge la label per la stat mana
	ctx.font = "58px InterBold";
	ctx.fillStyle = color2;

	const manaLabelWidth = ctx.measureText("Mana:").width;

	ctx.fillText("Mana:", 1260 - manaWidth - manaLabelWidth - 20, 600);
};

const generateProgressBar = (
	ctx,
	{ experience }: CharacterInterface,
	{ color1, color2 }: ColorsInterface,
	currentLevelIndex: number,
): void => {
	const percentage = Math.floor(
		(experience - (xps[currentLevelIndex - 1] || 0)) /
			((xps[currentLevelIndex] - (xps[currentLevelIndex - 1] || 0)) / 100),
	);

	// Background level bar
	for (let i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.lineWidth = 42;
		ctx.strokeStyle = color2;
		ctx.fillStyle = color2;
		ctx.arc(400 + i * 8.65, 300, 8, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fill();
	}
	// Progress bar
	for (let i = 0; i < percentage; i++) {
		ctx.beginPath();
		ctx.lineWidth = 42;
		ctx.strokeStyle = color1;
		ctx.fillStyle = color1;
		ctx.arc(400 + i * 8.65, 300, 8, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fill();
	}
};

const generateAvatar = async (ctx, c, { id }: CharacterInterface): Promise<void> => {
	const circle = {
		x: c.width / 7,
		y: c.height / 4,
		radius: 140,
	};

	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const a = await canvas.loadImage(`app/images/characters/${id}.jpg`);

	const aspect = a.height / a.width;
	// Math.max per un effetto cover, Math.min per contenere
	const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
	const hsy = circle.radius * Math.max(aspect, 1.0);
	// x - hsl e y - hsy mettono al centro l'immagine
	ctx.drawImage(a, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);
};

const generateCard = async (character: CharacterInterface): Promise<Buffer> => {
	// Create canvas
	const c = canvas.createCanvas(1342, 650);
	const ctx = c.getContext("2d");

	const currentLevelIndex =
		xps.findIndex((xp, index) => character?.experience >= xp && character.experience < xps[index + 1]) + 1;

	const colors: ColorsInterface = getColorByRole(character.role);

	await generateBackground(ctx, colors);
	generateText(ctx, character, colors, currentLevelIndex);
	generateProgressBar(ctx, character, colors, currentLevelIndex);
	await generateAvatar(ctx, c, character);

	const canvasData = await c.toBuffer("image/png");

	return canvasData;
};

export default generateCard;
export { generateCard };
