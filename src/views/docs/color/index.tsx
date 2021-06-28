import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
// @ts-ignore
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsColor() {
  return (
    <Page title="Documentation: Color | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
