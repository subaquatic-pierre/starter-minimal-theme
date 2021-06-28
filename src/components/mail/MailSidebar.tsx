import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Box, List, Drawer, Hidden, Button, Divider } from '@material-ui/core';
// redux
import { RootState } from '../../redux/store';
//
import Scrollbar from '../Scrollbar';
import MailSidebarItem from './MailSidebarItem';

// ----------------------------------------------------------------------

type MailSidebarProps = {
  isOpenSidebar: boolean;
  onOpenCompose: VoidFunction;
  onCloseSidebar: VoidFunction;
};

export default function MailSidebar({
  isOpenSidebar,
  onOpenCompose,
  onCloseSidebar
}: MailSidebarProps) {
  const { pathname } = useLocation();
  const { labels } = useSelector((state: RootState) => state.mail);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenCompose = () => {
    onCloseSidebar();
    onOpenCompose();
  };

  const renderContent = (
    <Scrollbar>
      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
          onClick={handleOpenCompose}
        >
          Compose
        </Button>
      </Box>

      <Divider />

      <List disablePadding>
        {labels.map((label) => (
          <MailSidebarItem key={label.id} label={label} />
        ))}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: 280 } }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          variant="permanent"
          PaperProps={{ sx: { width: 280, position: 'relative' } }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </>
  );
}
