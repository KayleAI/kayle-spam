import { normalise } from "kayle-normalise";
import type { SpamOptions } from "./types";

/**
 * If the text contains any of these words, it is likely to be spam
 */
const spamMap = new Set([
	"anymen",
	"anyoneavailable",
	"anyoneelse",
	"anyonefrom",
	"anyonehere",
	"anyoneup",
	"anyonewan",
	"anysingle",
	"areyousingle",
	"areusingle",
	"canibeyour",
	"closetome",
	"domenstill",
	"doyouagree",
	"doyouaccept",
	"doyoulike",
	"doyouwant",
	"doyouneed",
	"doyouhave",
	"willyouaccept",
	"willyoulike",
	"willyouwant",
	"willyouneed",
	"willyouhave",
	"followback",
	"followme",
	"followsme",
	"followyou",
	"gettoknow",
	"heartthis",
	"iaddyou",
	"iamtight",
	"ifura",
	"ifyou",
	"ifyouare",
	"ifyour",
	"ifyoure",
	"ineeda",
	"ineedsome",
	"ineedyou",
	"itsworthit",
	"iwantyou",
	"letsbefriends",
	"letshang",
	"likeif",
	"likesthispost",
	"likethispost",
	"guysonly",
	"guyswho",
	"guyswith",
	"guysfrom",
	"guysimagine",
	"menbody",
	"menfrom",
	"menimagine",
	"menonly",
	"menwho",
	"menwith",
	"whymen",
	"whydomen",
	"needagamer",
	"wantagamer",
	"bothmylips",
	"imsohorny",
	"imhorny",
	"canyouaccept",
	"meetyou",
	"meor",
	"mybody",
	"myof",
	"myonlyfans",
	"reactthis",
	"sendingapic",
	"singlein",
	"soalone",
	"someonehelpme",
	"tapbelow",
	"thispostfor",
	"wannasee",
	"watchme",
	"whoissingle",
	"whosupfor",
	"whossingle",
	"whosingle",
	"whowants",
	"whoelseis",
	"wouldyou",
	"clickhere",
	"checkmybio",
	"checklink",
	"checknow",
	"freeaccess",
	"freetrial",
	"newcontent",
	"privatepics",
	"subscribe",
	"vipaccess",
	"watchnow",
	"linkbio",
	"linkinbio",
	"whotaps",
	"whosin",
	"whoisin",
	"whosactuallyin",
	"whoactuallyin",
	"sendingu",
	"sendingyou",
	"sendingsuprise",
	"sendingasurprise",
	"quickie",
	"sendagift",
	"sendyou",
	"sendme",
	"sentyou",
	"tapthe",
	"taphere",
	"tapnow",
]);

const defaultOptions: SpamOptions = {
	additionalMappings: [],
};

const variations = [
	{
		replaceNumbers: true,
		replaceEmojis: true,
	},
	{
		replaceNumbers: false,
		replaceEmojis: true,
	},
	{
		replaceNumbers: true,
		replaceEmojis: false,
	},
	{
		replaceNumbers: false,
		replaceEmojis: false,
	},
] as const;

/**
 * Identifies if spam is likely to be present in the text
 * @param text Text to check
 * @param options Spam identification options
 * @returns Whether the text is spam
 */
export function identify(
	text: string,
	options: SpamOptions = defaultOptions,
): boolean {
	const opts = { ...defaultOptions, ...options };

	return variations.some((config) => {
		const normalisedText = normalise(text, {
			removeWhitespace: "all",
			replacePunctuation: true,
			...config,
		});

		return [...spamMap, ...(opts.additionalMappings ?? [])].some((spamWord) =>
			normalisedText.includes(spamWord),
		);
	});
}
