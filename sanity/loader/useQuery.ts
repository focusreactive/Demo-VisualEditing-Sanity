import {
  type QueryParams,
  type QueryResponseInitial,
  useEncodeDataAttribute,
  type UseQueryOptions,
} from '@sanity/react-loader/rsc';

import { queryStore } from './createQueryStore';

/**
 * Exports to be used in client-only or components that render both server and client
 */
export const useQuery = <QueryResponseResult = unknown, QueryResponseError = unknown>(
  query: string,
  params?: QueryParams,
  options?: UseQueryOptions<QueryResponseResult>,
) => {
  // @ts-expect-error
  const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(query, params, options);

  const encodeDataAttribute = useEncodeDataAttribute(snapshot.data, snapshot.sourceMap, '/admin');

  // Always throw errors if there are any
  if (snapshot.error) {
    throw snapshot.error;
  }

  return {
    ...snapshot,
    encodeDataAttribute,
  };
};

/**
 * Used by `./VisualEditing.tsx` to connect to `sanity/presentation`
 */
export const { useLiveMode } = queryStore;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

// export function useSettings(initial: QueryResponseInitial<SettingsPayload>) {
//   return useQuery<SettingsPayload>(settingsQuery, {}, { initial });
// }
