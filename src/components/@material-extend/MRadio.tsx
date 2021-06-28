import { alpha, useTheme } from '@material-ui/core/styles';
import { Radio, RadioProps } from '@material-ui/core';

// ----------------------------------------------------------------------

interface MRadioProps extends Omit<RadioProps, 'color'> {
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
}

export default function MRadio({
  color = 'primary',
  sx,
  ...other
}: MRadioProps) {
  const theme = useTheme();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Radio color={color} sx={sx} {...other} />;
  }

  return (
    <Radio
      sx={{
        '&.Mui-checked': {
          color: theme.palette[color].main
        },
        '&:hover, &.Mui-checked:hover': {
          bgcolor: alpha(
            theme.palette[color].main,
            theme.palette.action.hoverOpacity
          )
        },
        ...sx
      }}
      {...other}
    />
  );
}
