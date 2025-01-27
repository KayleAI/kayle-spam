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

	const normalisedText = normalise(text, {
		removeWhitespace: "all",
		replaceNumbers: true,
		replacePunctuation: true,
	});

	const isSpam = [...spamMap, ...(opts.additionalMappings ?? [])].some(
		(spamWord) => normalisedText.includes(spamWord),
	);

	return isSpam;
}
