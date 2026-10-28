// the archive (ArchivePage.jsx): earlier UI/UX design work, personal
// projects and explorations, newest year first (mixed within a year,
// so screens of one kind are not side by side), by their key in PROJECTS
// (projects.js), where each has its page - at /archive/<key>, or its own
// path. kept apart from projects.js so the nav bar can count them and the
// routes can find them without pulling in any project's content.
// one with only a `title` and `year` has no page yet: its card opens
// nothing
export const ARCHIVE = [
  // 2023
  { id: 'crit' },
  { id: 'aestherior' },
  // 2022
  { id: 'nba-redesign' },
  { id: 'iscan' },
  { id: 'wonderlad' },
  { id: 'jaysonbeniza' },
  { id: 'cryptostorage' },
  { id: 'handledare' },
  { id: 'regain-redesign' },
  { id: 'codygo' },
  { id: 'jbnza' },
  { id: 'archstone' },
  { id: 'artisan' },
];
