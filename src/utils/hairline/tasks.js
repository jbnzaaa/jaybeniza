import lifted from './lift'

/**
 * Tasks - usability testing: a test script on a screen, four tasks, each
 * a round and a bar. The pointer picks a task; its round stands up out of
 * the screen - the task tried - and the rounds above and below rise a
 * little. At rest the first task's round is up a little and bright. The
 * slider is how far a round stands.
 */
const task = (y) => ({
  r: [4, y - 1, 66, y + 19],
  // the round, then the bar beside it, which stays where it is
  s: [[8, y + 2, 22, y + 16, 7, 1.1, 0, 3], [27, y + 4, 62, y + 14, 3, 1, 0, 2, 1]],
  m: [[1, 32, y + 9, 56, y + 9]],
});

const mount = lifted({
  S: 2.4, box: [0, 0, 70, 104], zt: 26, word: "task", primary: 0,
  base: [[0, 0, 70, 104, 11, 1.6, -5, 0]],
  lines: [[8, 11, 38, 11]],
  parts: [20, 40, 60, 80].map(task),
});

const figure = {
  name: "tasks",
  means: "A test script, four tasks down a screen: the round of the task under the pointer stands up, and its neighbours follow.",
  rules: [1, 2, 5, 9],
  range: [8, 14, 22],
  mount,
};

export default figure;
