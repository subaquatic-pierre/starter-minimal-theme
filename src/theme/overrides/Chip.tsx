import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import { Theme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function Chip(theme: Theme) {
  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <Icon icon={closeCircleFill} />
      },

      styleOverrides: {
        label: {
          marginTop: -4
        },
        colorDefault: {
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: theme.palette.text.secondary
          }
        },
        outlined: {
          borderColor: theme.palette.grey[500_32],
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main
          }
        }
      }
    }
  };
}
