import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Card,
  Typography,
  CardHeader,
  CardContent
} from '@material-ui/core';
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

type ProfileAboutProps = {
  profile: Profile;
};

export default function ProfileAbout({ profile }: ProfileAboutProps) {
  const { quote, country, email, company, school } = profile;

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="About" />

      <CardContent>
        <Typography variant="body2">{quote}</Typography>

        <Box sx={{ display: 'flex', mt: 2 }}>
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {country}
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', mt: 2 }}>
          <IconStyle icon={emailFill} />
          <Typography variant="body2">{email}</Typography>
        </Box>

        <Box sx={{ display: 'flex', mt: 2 }}>
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', mt: 2 }}>
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
