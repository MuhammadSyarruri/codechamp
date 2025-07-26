import { htmlQuestions } from "./soal-html.js";
import { cssQuestions } from "./soal-css.js";
import { javascriptQuestions } from "./soal-javascript.js";
import { reactQuestions } from "./soal-react.js";

export const allQuestions = [
  ...htmlQuestions,
  ...cssQuestions,
  ...javascriptQuestions,
  ...reactQuestions,
];

console.log(allQuestions.length);
