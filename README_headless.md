To run headless SAP Fiori bootstrap tool:

```
node headless.js headless.json
```

Initially the json file should be empty and the agent will continue to write state there while repeatedly calling `node headless.js headless.json`

Useful Information

Types of Prompt Examples:
list: [class ListPrompt extends Prompt],
input: [class InputPrompt extends Prompt],
number: [class NumberPrompt extends InputPrompt],
confirm: [class ConfirmPrompt extends Prompt],
rawlist: [class RawListPrompt extends Prompt],
expand: [class ExpandPrompt extends Prompt],
checkbox: [class CheckboxPrompt extends Prompt],
password: [class PasswordPrompt extends Prompt],
editor: [class EditorPrompt extends Prompt]
