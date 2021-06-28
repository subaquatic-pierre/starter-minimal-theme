import { Icon } from '@iconify/react';
import heartFill from '@iconify/icons-eva/heart-fill';
// material
import {
  Box,
  Chip,
  Avatar,
  AvatarGroup,
  FormControlLabel,
  BoxProps
} from '@material-ui/core';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
// @types
import { Post } from '../../@types/blog';
//
import { MCheckbox } from '../@material-extend';

// ----------------------------------------------------------------------

interface BlogPostTagsProps extends BoxProps {
  post: Post;
}

export default function BlogPostTags({ post, sx }: BlogPostTagsProps) {
  const { favorite, tags, favoritePerson } = post;

  return (
    <Box sx={{ py: 3, ...sx }}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
      ))}

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <MCheckbox
              defaultChecked
              size="small"
              color="error"
              icon={<Icon icon={heartFill} />}
              checkedIcon={<Icon icon={heartFill} />}
            />
          }
          label={fShortenNumber(favorite)}
        />
        <AvatarGroup
          max={4}
          sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}
        >
          {favoritePerson.map((person) => (
            <Avatar
              key={person.name}
              alt={person.name}
              src={person.avatarUrl}
            />
          ))}
        </AvatarGroup>
      </Box>
    </Box>
  );
}
