import { normalise } from "kayle-normalise";
import type { SpamOptions } from "./types";

/**
 * If the text contains any of these words, it is likely to be spam
 */
const spamMap = new Set([
	"likeif",
	"menwho",
	"ifyoursingle",
	"ifyouresingle",
	"likethispost",
	"likesthispost",
	"whowants",
	"ifyoure",
	"ifyouare",
	"ifura",
	"heartthis",
	"myof",
	"guysonly",
	"tapbelow",
	"closetome",
	"iwantyou",
	"reactthis",
	"iaddyou",
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
