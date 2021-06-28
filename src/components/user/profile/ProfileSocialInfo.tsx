import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Card, CardHeader, CardContent } from '@material-ui/core';
// @types
import { Profile } from '../../../@types/user';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

export default function ProfileSocialInfo({ profile }: { profile: Profile }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

  const SOCIALS = [
    {
      name: 'Linkedin',
      icon: <IconStyle icon={linkedinFill} color="#006097" />,
      href: linkedinLink
    },
    {
      name: 'Twitter',
      icon: <IconStyle icon={twitterFill} color="#1C9CEA" />,
      href: twitterLink
    },
    {
      name: 'Instagram',
      icon: <IconStyle icon={instagramFilled} color="#D7336D" />,
      href: instagramLink
    },
    {
      name: 'Facebook',
      icon: <IconStyle icon={facebookFill} color="#1877F2" />,
      href: facebookLink
    }
  ];

  return (
    <Card>
      <CardHeader title="Social" />
      <CardContent>
        {SOCIALS.map((link) => (
          <Box
            key={link.name}
            sx={{
              display: 'flex',
              '&:not(:first-child)': { mt: 2 }
            }}
          >
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
