import { getPageMetadata } from '@/model/getPageMetadata';

export const generateNextMetadata = ({
  slug,
  metadata,
}: {
  slug: string;
  metadata: Awaited<ReturnType<typeof getPageMetadata>>;
}) => {
  const { ogTags, ogTwitter } = metadata;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    metadataBase: new URL('https://demo-visual-editing-sanity.vercel.app/'),
    alternates: {
      canonical: slug,
    },
    openGraph: {
      title: ogTags?.title || metadata.title,
      description: ogTags?.description || metadata.description,
      images: ogTags.image ? [ogTags.image] : undefined,
      type: ogTags?.type || 'website',
      url: slug,
      siteName: ogTags?.siteName,
    },
    twitter: {
      card: ogTwitter?.card || 'summary_large_image',
      title: ogTwitter?.title,
      description: ogTwitter?.description,
      images: ogTwitter.image ? [ogTwitter.image] : undefined,
      site: ogTwitter?.site,
    },
  };
};
