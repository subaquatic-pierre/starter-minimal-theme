import { ReactNode, useState } from 'react';
// material
import { Container, Box } from '@material-ui/core';
//
import DocsSidebar from './DocsSidebar';
import DocsNavbar from './DocsNavbar';

// ----------------------------------------------------------------------

type DocsLayoutProps = {
  children: ReactNode;
};
export default function DocsLayout({ children }: DocsLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100%', overflow: 'hidden' }}>
      <DocsNavbar onOpenSidebar={() => setOpen(true)} />
      <DocsSidebar onCloseSidebar={() => setOpen(false)} isOpenSidebar={open} />

      <Container
        maxWidth="md"
        sx={{
          my: 15,
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100%'
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
