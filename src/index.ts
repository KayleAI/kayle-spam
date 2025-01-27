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
	"canibeyour",
	"closetome",
	"domenstill",
	"doyouagree",
	"followback",
	"followme",
	"followyou",
	"gettoknow",
	"guysonly",
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
	"menbody",
	"menfrom",
	"menimagine",
	"menonly",
	"menwho",
	"menwith",
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
	"whowants",
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
