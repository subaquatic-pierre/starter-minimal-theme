import { ReactNode } from 'react';
// material
import { Box } from '@material-ui/core';
//
import HomeNavbar from './HomeNavbar';

// ----------------------------------------------------------------------

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <Box sx={{ height: '100%' }}>
      <HomeNavbar />
      <Box sx={{ height: '100%' }}>{children}</Box>
    </Box>
  );
}
