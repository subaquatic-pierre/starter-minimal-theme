import { useTheme } from '@material-ui/core/styles';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';

// ----------------------------------------------------------------------

declare module '@material-ui/core' {
  interface CircularProgressPropsColorOverrides {
    info: true;
    success: true;
    warning: true;
    error: true;
  }
}

export default function MCircularProgress({
  color = 'primary',
  sx,
  ...other
}: CircularProgressProps) {
  const theme = useTheme();

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <CircularProgress color={color} sx={sx} {...other} />;
  }

  return (
    <CircularProgress
      sx={{
        color: theme.palette[color].main,
        ...sx
      }}
      {...other}
    />
  );
}
