import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
// @ts-ignore
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsRouting() {
  return (
    <Page title="Documentation: Routing | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
