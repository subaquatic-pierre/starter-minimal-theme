import { orderBy } from 'lodash';
import { Link as ScrollLink } from 'react-scroll';
// material
import { Theme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
// @types
import { LinkComponent } from '../../@types/components-overview';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  top: 120,
  width: 280,
  zIndex: 99,
  flexShrink: 0,
  position: 'sticky',
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor:
    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  '& .isActive': {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
  }
}));

const ScrollLinkStyle = styled(ScrollLink)(({ theme }) => ({
  display: 'block',
  cursor: 'pointer',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  '&:hover': { color: theme.palette.primary.main }
}));

// ----------------------------------------------------------------------

function SidebarItem({
  link,
  index,
  sx
}: {
  link: LinkComponent;
  index?: number;
  sx?: SxProps<Theme>;
}) {
  const { title, href } = link;

  return (
    <ScrollLinkStyle
      to={href}
      spy={true}
      smooth={true}
      offset={-200}
      duration={500}
      activeClass="isActive"
      sx={sx}
    >
      {index && `0${index} -`} {title}
    </ScrollLinkStyle>
  );
}

export default function ComponentSidebar({
  links
}: {
  links: LinkComponent[];
}) {
  return (
    <RootStyle>
      {links.map((link, index) => (
        <Box
          key={link.title}
          sx={{
            '&:not(:last-of-type)': { mb: 2 }
          }}
        >
          <SidebarItem
            link={link}
            index={index + 1}
            sx={{ typography: 'subtitle1' }}
          />
          {link.sublinks &&
            orderBy(link.sublinks, ['title'], ['asc']).map((link) => (
              <SidebarItem
                key={link.title}
                link={link}
                sx={{ mt: 1.5, pl: 4.5, typography: 'subtitle2' }}
              />
            ))}
        </Box>
      ))}
    </RootStyle>
  );
}
