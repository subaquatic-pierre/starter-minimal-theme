import {
  alpha,
  Theme,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { ButtonGroup, ButtonGroupProps } from '@material-ui/core';
// @types
import { ColorSchema } from '../../@types/theme';

// ----------------------------------------------------------------------

const ButtonGroupStyle = styled(ButtonGroup)(
  ({
    theme,
    styleProps
  }: {
    theme: Theme;
    styleProps: {
      color: ColorSchema;
      variant: 'contained' | 'outlined' | 'text';
    };
  }) => {
    const { color, variant } = styleProps;

    const styleContained = (color: ColorSchema) => ({
      boxShadow: theme.customShadows[color],
      '& .MuiButtonGroup-grouped': {
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        borderColor: `${theme.palette[color].dark} !important`,
        '&:hover': {
          backgroundColor: theme.palette[color].dark
        }
      }
    });

    const styleOutlined = (color: ColorSchema) => ({
      '& .MuiButtonGroup-grouped': {
        color: theme.palette[color].main,
        borderColor: `${alpha(theme.palette[color].main, 0.48)} !important`,
        '&:hover': {
          borderColor: `${theme.palette[color].main} !important`,
          backgroundColor: alpha(
            theme.palette[color].main,
            theme.palette.action.hoverOpacity
          )
        }
      }
    });

    const styleText = (color: ColorSchema) => ({
      '& .MuiButtonGroup-grouped': {
        color: theme.palette[color].main,
        borderColor: `${theme.palette[color].main} !important`,
        '&:hover': {
          backgroundColor: alpha(
            theme.palette[color].main,
            theme.palette.action.hoverOpacity
          )
        }
      }
    });
    return {
      ...(variant === 'contained' && { ...styleContained(color) }),
      ...(variant === 'outlined' && { ...styleOutlined(color) }),
      ...(variant === 'text' && { ...styleText(color) })
    };
  }
);

// ----------------------------------------------------------------------

interface MButtonGroupProps extends Omit<ButtonGroupProps, 'color'> {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
}

export default function MButtonGroup({
  color = 'primary',
  variant = 'outlined',
  children,
  ...other
}: MButtonGroupProps) {
  const theme = useTheme();

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <ButtonGroup color={color} variant={variant} {...other}>
        {children}
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroupStyle
      variant={variant}
      styleProps={{ color, variant }}
      theme={theme}
      {...other}
    >
      {children}
    </ButtonGroupStyle>
  );
}
