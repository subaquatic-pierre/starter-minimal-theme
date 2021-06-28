import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown/with-html';
import { useDispatch, useSelector } from 'react-redux';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
// redux
import { RootState } from '../../redux/store';
import { getMail } from '../../redux/slices/mail';
//
import Scrollbar from '../Scrollbar';
import MailDetailsToolbar from './MailDetailsToolbar';
import MailDetailsReplyInput from './MailDetailsReplyInput';
import MailDetailsAttachments from './MailDetailsAttachments';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
}));

const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
  '& > p': {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
    lineHeight: theme.typography.body1.lineHeight,
    marginBottom: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function MailDetails() {
  const { mailId = '' } = useParams<{ mailId?: string }>();
  const dispatch = useDispatch();
  const mail = useSelector((state: RootState) => state.mail.mails.byId[mailId]);
  const isAttached = mail && mail.files.length > 0;

  useEffect(() => {
    dispatch(getMail(mailId));
  }, [dispatch, mailId]);

  if (!mail) {
    return null;
  }

  return (
    <RootStyle>
      <MailDetailsToolbar mail={mail} />

      <Divider />

      <Scrollbar>
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h3" gutterBottom>
            {mail.subject}
          </Typography>
          <MarkdownWrapperStyle>
            <Markdown source={mail.message} />
          </MarkdownWrapperStyle>
        </Box>
      </Scrollbar>

      {isAttached && <MailDetailsAttachments mail={mail} />}

      <Divider />

      <MailDetailsReplyInput />
    </RootStyle>
  );
}
