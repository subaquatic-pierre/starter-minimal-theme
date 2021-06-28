import { Icon } from '@iconify/react';
import { uniq, flatten } from 'lodash';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Divider, Collapse, Typography } from '@material-ui/core';
// theme
import typography from '../../theme/typography';
// utils
import { fDateTime } from '../../utils/formatTime';
import { getFileFullName, getFileThumb } from '../../utils/getFileFormat';
// @types
import { Conversation, Message } from '../../@types/chat';
//
import Scrollbar from '../Scrollbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2)
}));

const FileItemStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 2.5)
}));

const FileThumbStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[500_16],
  '& img': { width: '100%', height: '100%' },
  '& svg': { width: 24, height: 24 }
}));

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...typography.overline,
  height: 40,
  flexShrink: 0,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
  color: theme.palette.text.disabled
}));

// ----------------------------------------------------------------------

function AttachmentItem({ file, fileUrl }: { file: Message; fileUrl: string }) {
  return (
    <FileItemStyle key={fileUrl}>
      <FileThumbStyle>{getFileThumb(fileUrl)}</FileThumbStyle>
      <Box sx={{ ml: 1.5, maxWidth: 150 }}>
        <Typography variant="body2" noWrap>
          {getFileFullName(fileUrl)}
        </Typography>
        <Typography
          noWrap
          variant="caption"
          sx={{ color: 'text.secondary', display: 'block' }}
        >
          {fDateTime(file.createdAt)}
        </Typography>
      </Box>
    </FileItemStyle>
  );
}

type ChatRoomAttachmentProps = {
  conversation: Conversation;
  isCollapse: boolean;
  onCollapse: VoidFunction;
};

export default function ChatRoomAttachment({
  conversation,
  isCollapse,
  onCollapse
}: ChatRoomAttachmentProps) {
  const totalAttachment = uniq(
    flatten(conversation.messages.map((item) => item.attachments))
  ).length;

  return (
    <RootStyle>
      <CollapseButtonStyle
        fullWidth
        color="inherit"
        onClick={onCollapse}
        endIcon={
          <Icon
            icon={isCollapse ? arrowIosDownwardFill : arrowIosForwardFill}
            width={16}
            height={16}
          />
        }
      >
        attachment ({totalAttachment})
      </CollapseButtonStyle>

      {!isCollapse && <Divider />}

      <Scrollbar>
        <Collapse in={isCollapse}>
          {conversation.messages.map((file) => (
            <div key={file.id}>
              {file.attachments.map((fileUrl) => (
                <AttachmentItem key={fileUrl} file={file} fileUrl={fileUrl} />
              ))}
            </div>
          ))}
        </Collapse>
      </Scrollbar>
    </RootStyle>
  );
}
