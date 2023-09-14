import groq from 'groq';
import { client } from '@/sanity/client';

export const getAllPagesSlugs = async () => {
  const query = groq`
        * [_type == 'dynamicPage'
            && !(_id in path('drafts.**'))
        ] {
          "slug": path.current
        }[].slug
    `;

  return await client.fetch(query);
};
