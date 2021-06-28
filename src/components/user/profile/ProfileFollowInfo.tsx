// material
import { Box, Card, Divider, Typography, CardContent } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
// @types
import { Profile } from '../../../@types/user';

// ----------------------------------------------------------------------

export default function ProfileFollowInfo({ profile }: { profile: Profile }) {
  const { follower, following } = profile;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{fNumber(follower)}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Follower
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{fNumber(following)}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Following
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
