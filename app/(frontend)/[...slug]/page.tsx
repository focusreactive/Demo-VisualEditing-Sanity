// import { getAllPagesSlugs } from '@/model/getAllPagesSlugs';
// import { notFound } from 'next/navigation';
// import { draftMode } from 'next/headers';
// import { sanityReadToken } from '@/environment';
// import { DynamicPage } from '@/components/DynamicPage';
// import { Metadata } from 'next';
// import { getPageMetadata } from '@/model/getPageMetadata';
// import { loadPage } from '@/sanity/loader/loadQuery';
// import { generateNextMetadata } from '@/utils/generateNextMetadata';
//
type Props = { params: { slug?: string[] } };
//
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const slug = params.slug ? `/${params.slug.join('/')}` : '/';
//   const metadata = await getPageMetadata({ slug });
//
//   if (!metadata) return {};
//
//   return generateNextMetadata({ slug, metadata });
// }
//
// export async function generateStaticParams() {
//   const slugs = await getAllPagesSlugs();
//
//   return slugs.map((slug: string) => ({ slug: slug ? slug.split('/') : ['/'] }));
// }

export default async function Page({ params }: Props) {
  return <div>123</div>
  // const { slug } = params;
  // const isDraftMode = draftMode().isEnabled;
  // const pageSlug = slug ? slug.join('/') : '/';
  //
  // const initial = await loadPage(pageSlug);
  //
  // if (!initial.data) return notFound();
  //
  // return <DynamicPage initial={initial} pageSlug={pageSlug} token={sanityReadToken} isDraftMode={isDraftMode} />;
}
