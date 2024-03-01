import { createClient } from '@sanity/client/stega';

import config from './config';

export const client = createClient({
  ...config,
  stega: {
    enabled: false,
    studioUrl: '/admin',
    filter: (props) => {
      if (['bgColor', 'sectionConfig'].find((key) => props.sourcePath.includes(key))) {
        return false;
      }
      return props.filterDefault(props);
    },
  },
});
