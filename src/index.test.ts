import { describe, expect, test } from "bun:test";
import { identify } from "./index";

describe("identify spam", () => {
	test("not spam", () => {
		const input = "This isn't spam...";
		const expected = false;
		expect(identify(input)).toBe(expected);
	});

	test("standard spam", () => {
		const input = "like if you want to be my friend";
		const expected = true;
		expect(identify(input)).toBe(expected);
	});

	test("spam with additional mappings", () => {
		const input = "i like drugs";
		const expected = true;
		expect(
			identify(input, {
				additionalMappings: ["drugs"],
			}),
		).toBe(expected);
	});

	test("less obvious spam", () => {
		const input = "dating to marry like this post";
		const expected = true;
		expect(identify(input)).toBe(expected);
	});

	test("spam with attempted to bypass", () => {
		const input = "💗 ‌ ‎‎ ‎ ‌‎ ‎ ‎L ‎ ‎ ‎ ‎ ‌‎ ‎ ‎ ‎I ‎ ‌‎ ‎ ‌‎ ‌‎ ‎ ‎ ‎ ‎K ‎ ‎ ‌‎ ‎ ‎ ‌‎ ‎ ‎E ‎ ‎ ‌‎ ‎ ‎ 💗\n💗 ‌ ‎ ‎ ‌‎‎ ‎ ‎I ‎ ‌‎ ‎ ‎ ‎ ‎ ‎ ‌‌‎ F‌‌‎ ‌‎ ‎ ‎ ‌‎ ‎ ‎ ‌‎ 💗\n💗 ‌ ‎ ‎ ‎ ‌‎‎Y ‎ ‎ ‎ ‌‎ ‎ ‎ O ‎ ‎ ‎ ‎ ‎‌‎ ‎U ‎ ‎ ‌‎ ‎ ‎ ‌‎‎💗\n💗 ‌ ‌‎ ‎‎ ‌‎ ‎A ‎ ‎‌‎ ‎ ‎ ‎ ‎ R ‎ ‎ ‎ ‎ ‎‌‎ ‎ ‎E ‎ ‎ ‌‎ ‎ ‎ ‌‎💗\n💗 ‌ ‎ ‎ ‌‎ ‎S ‎ ‌‎ ‎ ‎ ‎ ‎ ‎ I ‎ ‎ ‎‌‎ ‎ ‎ ‎ ‎ N ‎ ‎‌‎ ‎ ‎ ‎ ‎ G ‎ ‎ ‎ ‌‎ ‌‎ ‎ L ‌‎ ‎ ‎ ‎ ‎ ‎ E ‎ ‎ ‌ ‎‎💗\n💗 ‌ ‎ ‎ ‌‎‎ ‎(I‘m single too 🤭) ‎ ‎ ‌‎ ‎ ‎ 💗";
		const expected = true;
		expect(identify(input)).toBe(expected);
	});

	test("attempt to bypass with emojis", () => {
		const input = "💗 like 💗 this 💗 post 💗";
		const expected = true;
		expect(identify(input)).toBe(expected);
	});
});
