# kayle-spam

Detect spam in human-readable text.

## Usage

Install the package:

```bash
npm install kayle-spam
```

Import the package:

```ts
import { identify } from "kayle-spam";
```

Use the `identify` function:

```ts
const thisIsntSpam = identify("Hello, world!");
console.log(thisIsntSpam); // false

const thisIsSpam = identify("💗 like 💗 this 💗 post 💗");
console.log(thisIsSpam); // true
```

## Options

You can pass an options object to the `identify` function to add additional mappings:

```ts
const isSpam = identify("Hell0, w🌍rld!", {
	additionalMappings: ["🌍"],
});

console.log(isSpam); // true (it contains "🌍" which we passed in the options)
```

Available options:

- `additionalMappings`: An array of strings to be used in the spam detection process. Defaults to `[]`.

## Tests

```bash
bun test
```
