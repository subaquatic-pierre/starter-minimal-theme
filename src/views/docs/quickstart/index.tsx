import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
// @ts-ignore
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsQuickStart() {
  return (
    <Page title="Documentation: Quick Start | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}