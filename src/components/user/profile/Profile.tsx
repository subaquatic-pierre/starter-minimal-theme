// material
import { Grid } from '@material-ui/core';
// @types
import { Profile as UserProfile, UserPost } from '../../../@types/user';
import { User } from '../../../@types/account';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

type ProfileProps = {
  myProfile: UserProfile;
  posts: UserPost[];
  authUser: User;
};

export default function Profile({ myProfile, posts, authUser }: ProfileProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ProfileFollowInfo profile={myProfile} />
        <ProfileAbout profile={myProfile} />
        <ProfileSocialInfo profile={myProfile} />
      </Grid>

      <Grid item xs={12} md={8}>
        <ProfilePostInput />
        {posts.map((post) => (
          <ProfilePostCard key={post.id} post={post} authUser={authUser} />
        ))}
      </Grid>
    </Grid>
  );
}
