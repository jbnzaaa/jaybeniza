import { useEffect } from 'react'

// the site's own title (as in index.html), kept by the landing page
export const SITE_TITLE = 'Jay Beniza - UI/UX Designer';

/**
 * Sets the browser tab's title to the open page's own name - "About",
 * "GuRover" - so a tab, a bookmark or a shared link says which page it is.
 * Every page sets one, so moving between pages never leaves the last
 * page's title behind.
 *
 * @param {string} [title] - the page's name; left out, the site's title
 */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title || SITE_TITLE;
  }, [title]);
}
