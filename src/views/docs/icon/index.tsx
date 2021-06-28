import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
// @ts-ignore
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsIcon() {
  return (
    <Page title="Documentation: Icon | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
