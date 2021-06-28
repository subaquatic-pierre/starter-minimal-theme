import { Box, BoxProps } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function Logo(props: BoxProps) {
  return (
    <Box
      component="img"
      alt="logo"
      src="/static/brand/logo_single.svg"
      height={40}
      {...props}
    />
  );
}
