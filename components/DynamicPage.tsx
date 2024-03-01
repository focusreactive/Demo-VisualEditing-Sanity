import dynamic from 'next/dynamic';
import { Page } from '@/components/Page';
import { DynamicPagePayload } from '@focusreactive/cms-kit';
import { QueryResponseInitial } from '@sanity/react-loader/rsc';

const PreviewPage = dynamic(() => import('@/components/PreviewPage'));
const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'));

export const DynamicPage = ({
  initial,
  pageSlug,
  isDraftMode,
  token,
}: {
  initial: QueryResponseInitial<DynamicPagePayload>;
  pageSlug: string;
  isDraftMode: boolean;
  token: string;
}) => {
  if (token) {
    return (
      <>
        <PreviewPage initial={initial} params={{ slug: pageSlug }} />
        {/* If it loads conditionally, uncomment the draft mode check inside */}
        {/*{isDraftMode && <VisualEditing />}*/}
        <VisualEditing />
      </>
    );
  }

  // @ts-ignore
  return <Page page={initial.data} />;
};
