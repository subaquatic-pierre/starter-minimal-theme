import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import {
  Box,
  Menu,
  Button,
  MenuItem,
  Typography,
  BoxProps
} from '@material-ui/core';

// ----------------------------------------------------------------------

function renderLabel(label: string | null) {
  if (label === 'featured') {
    return 'Featured';
  }
  if (label === 'newest') {
    return 'Newest';
  }
  if (label === 'priceDesc') {
    return 'Price: High-Low';
  }
  return 'Price: Low-High';
}

interface ShopProductSortProps extends BoxProps {
  sortBy: string | null;
  sortByOptions: {
    value: string;
    label: string;
  }[];
  onSortBy: (value: string) => void;
}

export default function ShopProductSort({
  sortByOptions,
  sortBy,
  onSortBy,
  sx,
  ...other
}: ShopProductSortProps) {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (currentTarget: HTMLButtonElement) => {
    setOpen(currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleonSortBy = (value: string) => {
    handleClose();
    onSortBy(value);
  };

  return (
    <Box
      sx={{
        ml: { sm: 3 },
        ...sx
      }}
      {...other}
    >
      <Button
        color="inherit"
        disableRipple
        onClick={(e) => handleOpen(e.currentTarget)}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {renderLabel(sortBy)}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {sortByOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortBy}
            onClick={() => handleonSortBy(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
