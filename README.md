# kayle-normalise

Normalise human-readable text to a machine-readable format.

Converts special characters to their closest match (by appearance).

## Usage

Install the package:

```bash
npm install kayle-normalise
```

Import the package:

```ts
import { normalise } from "kayle-normalise";
```

Use the `normalise` function:

```ts
const normalised = normalise("Hello, world!");
console.log(normalised); // "hello world"

const hello = normalise("ⓗⓔⓛⓛⓞ");
console.log(hello); // "hello"
```

## Options

You can pass an options object to the `normalise` function to customise the behaviour:

```ts
const normalised = normalise("Hell0, w🌍rld!", {
	replaceNumbers: false,
	replacePunctuation: true,
	removeWhitespace: "some",
	additionalMappings: {
		"🌍": "o",
	},
});

console.log(normalised); // "hell0 world"
```

Available options:

- `replaceNumbers`: Whether to replace numbers with their corresponding letters (0->o, 1->i, 3->e, 5->s). Defaults to `true`.
- `replacePunctuation`: Whether to replace punctuation with an empty string. Defaults to `true`.
- `removeWhitespace`: `all` to remove all whitespace, `some` to remove unnecessary whitespace, `none` to keep all whitespace. Defaults to `all`.
- `additionalMappings`: Additional mappings to be used in the normalisation process. Defaults to `{}`.

## Tests

```bash
bun test
```
