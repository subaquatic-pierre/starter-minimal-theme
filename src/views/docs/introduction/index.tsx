import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
// @ts-ignore
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsIntroduction() {
  return (
    <Page title="Documentation: Introduction | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
