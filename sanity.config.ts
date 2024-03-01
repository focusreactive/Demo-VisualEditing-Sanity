import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
import { media } from 'sanity-plugin-media';

import { locate } from '@/sanity/utils/locate';
import { schemaTypes } from '@/sanity/schemas';
import config from '@/sanity/config';
import { defaultDocumentNode, structure } from '@/sanity/structure';
import { client } from '@/sanity/client';
import { createQueryStore } from '@sanity/react-loader';

const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';

export default defineConfig({
  name: 'default',
  title: 'Next.js + Sanity MVP',

  basePath: '/admin',

  ...config,

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      previewUrl: {
        origin: typeof location === 'undefined' ? 'http://localhost:3000' : location.origin,
        previewMode: {
          enable: '/api/draft',
        },
      },
      locate,
    }),
    visionTool(),
    media(),
    colorInput(),
  ],

  schema: {
    // @ts-ignore
    types: schemaTypes,
  },
});

export const { loadQuery, useQuery, useLiveMode } = createQueryStore({
  client,
});
