import { Icon } from '@iconify/react';
import { Location } from 'history';
import { ReactNode, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
// theme
import typography from '../../theme/typography';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...typography.body2,
  height: 48,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&.isActiveRoot': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      position: 'absolute',
      backgroundColor: theme.palette.primary.main
    }
  },
  '&.isActiveSub': {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    '& .subIcon:before': {
      transform: 'scale(2)',
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const SubIconStyle = styled('span')(({ theme }) => ({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:before': {
    width: 4,
    height: 4,
    content: "''",
    display: 'block',
    borderRadius: '50%',
    backgroundColor: theme.palette.text.disabled,
    transition: theme.transitions.create('transform')
  }
}));
// ----------------------------------------------------------------------

type NavItemProps = {
  level: number;
  title: string;
  href?: string;
  info?: ReactNode;
  icon?: ReactNode;
  open?: boolean;
  children?: ReactNode;
  className?: string;
};

export default function SidebarItem({
  level,
  title,
  href,
  info,
  icon,
  open = false,
  children,
  className
}: NavItemProps) {
  const [show, setShow] = useState(open);
  const isSubItem = level > 0;

  const handleShow = () => {
    setShow((show) => !show);
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          button
          disableGutters
          onClick={handleShow}
          className={open ? 'isActiveRoot' : ''}
        >
          <ListItemIcon>{icon && icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={show ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={show}>{children}</Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      button
      // @ts-ignore
      to={href}
      exact={open}
      disableGutters
      component={RouterLink}
      activeClassName={isSubItem ? 'isActiveSub' : 'isActiveRoot'}
      isActive={(match: { url: string }, location: Location) => {
        if (!match) {
          return false;
        }

        const { url } = match;
        const { pathname } = location;
        const isMatch = url === pathname;

        if (!isSubItem) {
          return url.length && pathname.includes(url);
        }

        return isMatch;
      }}
    >
      <ListItemIcon>
        {isSubItem ? <SubIconStyle className="subIcon" /> : icon}
      </ListItemIcon>
      <ListItemText disableTypography primary={title} />

      {info && info}
    </ListItemStyle>
  );
}
