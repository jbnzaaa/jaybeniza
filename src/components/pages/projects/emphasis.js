// the part of each project's title set in the pixel face (SplitText
// `emphasis`), by its title: a word or words, or { letters: [...] }, the
// places of letters in it. kept apart from projects.js so the landing
// page (Featured Work, the next-project heading) and the Work grid can
// set titles without loading every project's content
const TITLE_EMPHASIS = {
  'Portfolio ’26': { letters: [4, 5, 6, 7, 8] },
  'Portfolio ’22': { letters: [4, 5, 6, 7, 8] },
  'Portfolio ’22 (First edition)': { letters: [4, 5, 6, 7, 8] },
  'BiteWise': { letters: [4, 5, 6, 7] },
  'Rover SIS': ['SIS'],
  'GuRover': { letters: [0, 1, 2, 3] },
  'COMELEC Gamified 3D for ACM': ['Gamified'],
  'PSGS': { letters: [0, 1] },
  'AACCUP': { letters: [0, 1] },
  'DOST ARISE': ['ARISE'],
  'DOST Courseware (5 Lessons)': ['Courseware'],
  'DOST VLAS (6 Modules)': ['VLAS'],
  'ReGain': { letters: [2, 3, 4, 5] },
  'Central App Design System': ['System'],
};

// the part of a title set in the pixel face, wherever it is shown (its
// card, its page): its own, or letters picked from the title (SplitText)
export const titleEmphasis = (title) => TITLE_EMPHASIS[title] || 'letters';
