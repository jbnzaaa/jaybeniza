// sets a Title Case label in sentence case: "Areas of Expertise" reads
// "Areas of expertise". only plain capitalised words drop their capital -
// acronyms and names with capitals inside them (UI/UX, GuRover, BiteWise)
// are left as written, and so is the first word. each part of a hyphenated
// word is looked at on its own ("Front-End" reads "Front-end")
const PLAIN = /^[A-Z][a-z’']*$/;

export default function sentenceCase(text) {
  return text.split(' ').map((word, wi) => word.split('-').map((part, pi) => (
    (wi > 0 || pi > 0) && PLAIN.test(part) ? part.toLowerCase() : part
  )).join('-')).join(' ');
}
