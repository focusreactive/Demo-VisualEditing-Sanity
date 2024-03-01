import 'server-only';

import { draftMode } from 'next/headers';

import { queryStore } from './createQueryStore';
import { PAGE_CONTENT_QUERY } from '@/model/queries';
import { sanityReadToken } from '@/environment';
import { client } from '../client';
import { DynamicPagePayload } from '@focusreactive/cms-kit';

const serverClient = client.withConfig({
  token: sanityReadToken,
  stega: true,
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const { perspective = draftMode().isEnabled ? 'previewDrafts' : 'published' } = options;
  // Don't cache by default
  let cache: RequestCache = 'no-store';
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    cache = 'force-cache';
  }

  return queryStore.loadQuery(query, params, {
    cache,
    ...options,
    perspective,
  });
}) satisfies typeof queryStore.loadQuery;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadPage(slug: string) {
  return loadQuery<DynamicPagePayload>(PAGE_CONTENT_QUERY, { slug }, { next: { tags: [`page:${slug}`] } });
}
