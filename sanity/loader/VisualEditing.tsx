'use client';

import { VisualEditing } from 'next-sanity';
import { useEffect } from 'react';
import { useLiveMode } from './useQuery';
import { client } from '../client';

// Always enable stega in Live Mode
const stegaClient = client.withConfig({
  stega: true,
});

export default function LiveVisualEditing() {
  useLiveMode({ client: stegaClient, studioUrl: '/admin' });
  // Will cause a loop if the component does not load conditionally
  // useEffect(() => {
  //   // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
  //   if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview' && window === parent) {
  //     location.href = '/api/disable-draft';
  //   }
  // }, []);

  return <VisualEditing />;
}
