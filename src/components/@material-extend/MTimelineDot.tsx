// material
import {
  Theme,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { TimelineDot, TimelineDotProps } from '@material-ui/lab';
// @types
import { ColorSchema } from '../../@types/theme';

// ----------------------------------------------------------------------

const TimelineDotStyle = styled(TimelineDot)(
  ({
    theme,
    styleProps
  }: {
    theme: Theme;
    styleProps: {
      color: ColorSchema;
      variant: 'filled' | 'outlined';
    };
  }) => {
    const { color, variant } = styleProps;

    return {
      ...(variant === 'filled'
        ? {
            '&.MuiTimelineDot-filled': {
              color: theme.palette[color].contrastText,
              backgroundColor: theme.palette[color].main
            }
          }
        : {
            '&.MuiTimelineDot-outlined': {
              borderColor: theme.palette[color].main
            }
          })
    };
  }
);

// ----------------------------------------------------------------------

interface MTimelineDotProps extends Omit<TimelineDotProps, 'color'> {
  color?:
    | 'grey'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
}

export default function MTimelineDot({
  color = 'grey',
  variant = 'filled',
  ...other
}: MTimelineDotProps) {
  const theme = useTheme();

  if (
    color === 'grey' ||
    color === 'inherit' ||
    color === 'primary' ||
    color === 'secondary'
  ) {
    return <TimelineDot color={color} variant={variant} {...other} />;
  }

  return (
    <TimelineDotStyle
      variant={variant}
      styleProps={{ color, variant }}
      theme={theme}
      {...other}
    />
  );
}
