import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
// @ts-ignore
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsApiCalls() {
  return (
    <Page title="Documentation: Api Calls | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
