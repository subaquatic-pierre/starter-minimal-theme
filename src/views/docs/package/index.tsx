import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
// @ts-ignore
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsPackage() {
  return (
    <Page title="Documentation: Package | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
