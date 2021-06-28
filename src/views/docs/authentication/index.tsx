import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
// @ts-ignore
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsAuthentication() {
  return (
    <Page title="Documentation: Authentication | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
