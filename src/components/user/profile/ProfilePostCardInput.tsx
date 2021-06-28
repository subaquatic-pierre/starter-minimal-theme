import { Icon } from '@iconify/react';
import roundSend from '@iconify/icons-ic/round-send';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { Box, TextField, IconButton, InputAdornment } from '@material-ui/core';
//
import MyAvatar from '../../MyAvatar';
import EmojiPicker from '../../EmojiPicker';

// ----------------------------------------------------------------------

type ProfilePostCardInputProps = {
  message: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  commentInputRef: React.RefObject<HTMLInputElement>;
  onSetMessage: (message: string) => void;
  onClickAttach: VoidFunction;
  onChangeMessage: (value: string) => void;
};

export default function ProfilePostCardInput({
  message,
  fileInputRef,
  commentInputRef,
  onSetMessage,
  onClickAttach,
  onChangeMessage
}: ProfilePostCardInputProps) {
  return (
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <MyAvatar />
      <TextField
        fullWidth
        size="small"
        value={message}
        inputRef={commentInputRef}
        placeholder="Write a comment…"
        onChange={(e) => onChangeMessage(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={onClickAttach}>
                <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
              </IconButton>
              <EmojiPicker alignRight value={message} setValue={onSetMessage} />
            </InputAdornment>
          )
        }}
        sx={{
          ml: 2,
          mr: 1,
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
          }
        }}
      />
      <IconButton>
        <Icon icon={roundSend} width={24} height={24} />
      </IconButton>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </Box>
  );
}
