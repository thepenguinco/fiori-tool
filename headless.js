import { createEnv } from 'yeoman-environment';
import { createPromptModule } from 'inquirer';
import { createLogger } from './log.js'
import fs from 'fs';

class TestAdapter {
  stdin;
  stdout;
  stderr;
  console;
  log;
  promptModule;
  abortController = new AbortController();
  /**
   * `TestAdapter` is an implementation of `Adapter`, an abstraction
   * layer that defines the I/O interactions.
   *
   * It provides a CLI interaction
   *
   * @constructor
   * @param {Object}          [options]
   * @param {Console} [options.console]
   */
  constructor(options, answers) {
      this.stdin = options?.stdin ?? process.stdin;
      this.stdout = options?.stdout ?? process.stdout;
      this.stderr = options?.stderr ?? options?.stdout ?? process.stderr;
      this.console = options?.console ?? new console.Console(this.stdout, this.stderr);
      this.promptModule =
          options?.promptModule ??
              createPromptModule(
              {
                  skipTTYChecks: true,
                  input: this.stdin,
                  output: this.stdout,
                  signal: this.abortController.signal,
              }
            );
      this.log = options?.log ?? createLogger(this);
      this.answers = answers
  }
  get _colorDiffAdded() {
      return chalk.black.bgGreen;
  }
  get _colorDiffRemoved() {
      return chalk.bgRed;
  }
  _colorLines(name, string) {
      return string
          .split('\n')
          .map(line => this[`_colorDiff${name}`](line))
          .join('\n');
  }
  close() {
      this.abortController.abort();
  }
  /**
   * Prompt a user for one or more questions and pass
   * the answer(s) to the provided callback.
   *
   * It shares its interface with `Base.prompt`
   *
   * (Defined inside the constructor to keep interfaces separated between
   * instances)
   *
   * @param questions
   * @param answers Answers to be passed to inquirer
   * @return promise answers
   */
  async prompt(questions, initialAnswers) {
    const promise = this.promptModule(questions, this.answers);
    promise.then(function(answers){
      // console.log(answers)
    });
    return promise;
  }
}

var args = process.argv.slice(2);
var answers = JSON.parse(fs.readFileSync(args[0], 'utf8'));

// Use custom adapter and environment
var adapter = new TestAdapter(undefined, answers)
var env = createEnv({adapter});

// The lookup() method will search the user computer for installed generators
// The search if done from the current working directory
env.lookup();

env.run('@sap/fiori').then(() => {
    console.log('success')
  }, err => {
    console.log(`error ${err}`);
  });
