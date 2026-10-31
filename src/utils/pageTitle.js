import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// the site's own title (as in index.html), kept by the landing page
export const SITE_TITLE = 'Jay Beniza - UI/UX Designer';

// the address the site is served at: the canonical and og:url of every
// page start with it (as do sitemap.xml and index.html)
export const SITE_URL = 'https://jaybeniza.vercel.app';

// the site's own description (as in index.html), for a page without one
export const SITE_DESCRIPTION = 'Jay Beniza is a UI/UX designer in the Philippines with 3.5+ years of experience designing web and mobile products. See UX case studies and shipped work.';

// sets the content of a <meta> tag, by its name or property, adding the
// tag if index.html has none
function setMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// sets the page's canonical address, adding the <link> if there is none
function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Sets the open page's title, description and canonical address, so a
 * tab, a bookmark, a search result or a shared link says which page it
 * is - "About - Jay Beniza", "GuRover - Jay Beniza". Every page sets one,
 * so moving between pages never leaves the last page's title behind.
 *
 * @param {string} [title] - the page's name; left out, the site's title
 * @param {string} [description] - what the page is; left out, the site's
 */
export function usePageTitle(title, description) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} - Jay Beniza` : SITE_TITLE;
    const text = description || SITE_DESCRIPTION;
    // one address per page: no trailing slash, except the landing page's
    const url = SITE_URL + (pathname.replace(/\/+$/, '') || '/');

    document.title = fullTitle;
    setMeta('name', 'description', text);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', text);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', text);
    setCanonical(url);
  }, [title, description, pathname]);
}
