import { getAllPagesSlugs } from '@/model/getAllPagesSlugs';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { sanityReadToken } from '@/environment';
import { DynamicPage } from '@/components/DynamicPage';
import { Metadata } from 'next';
import { getPageMetadata } from '@/model/getPageMetadata';
import { loadPage } from '@/sanity/loader/loadQuery';
import { generateNextMetadata } from '@/utils/generateNextMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const slug = '/';
  const metadata = await getPageMetadata({ slug });

  if (!metadata) return {};

  return generateNextMetadata({ slug, metadata });
}

export default async function Page() {
  const slug = '/';
  const isDraftMode = draftMode().isEnabled;

  const initial = await loadPage(slug);

  if (!initial.data) return notFound();

  return <DynamicPage initial={initial} pageSlug={slug} token={sanityReadToken} isDraftMode={isDraftMode} />;
}
