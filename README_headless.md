To run headless SAP Fiori bootstrap tool:

```
node headless.js headless.json
```

Initially the json file should be empty and the agent will continue to write state there while repeatedly calling `node headless.js headless.json`

If the agent wants to choose an ID option that looks like JSON, it should send a JSON object, not a string.
Confirm must be sent as boolean true or false, not a string.

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
