import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Theme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Switch,
  FormGroup,
  Typography,
  FormControlLabel
} from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { LoadingButton } from '@material-ui/lab';
// utils
import fakeRequest from '../../../utils/fakeRequest';
// @types
import { NotificationSettings } from '../../../@types/user';

// ----------------------------------------------------------------------

const ACTIVITY_OPTIONS = [
  {
    value: 'activityComments',
    label: 'Email me when someone comments onmy article'
  },
  {
    value: 'activityAnswers',
    label: 'Email me when someone answers on my form'
  },
  { value: 'activityFollows', label: 'Email me hen someone follows me' }
] as const;

const APPLICATION_OPTIONS = [
  { value: 'applicationNews', label: 'News and announcements' },
  { value: 'applicationProduct', label: 'Weekly product updates' },
  { value: 'applicationBlog', label: 'Weekly blog digest' }
] as const;

// ----------------------------------------------------------------------

type AccountNotificationsProps = {
  notifications: NotificationSettings;
  sx?: SxProps<Theme>;
};

export default function AccountNotifications({
  notifications,
  sx
}: AccountNotificationsProps) {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      activityComments: notifications.activityComments,
      activityAnswers: notifications.activityAnswers,
      activityFollows: notifications.activityFollows,
      applicationNews: notifications.applicationNews,
      applicationProduct: notifications.applicationProduct,
      applicationBlog: notifications.applicationBlog
    },
    onSubmit: async (values, { setSubmitting }) => {
      await fakeRequest(500);
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Save success', { variant: 'success' });
    }
  });

  const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3, ...sx }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <FormGroup>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: 'text.secondary' }}
            >
              Activity
            </Typography>
            {ACTIVITY_OPTIONS.map((activity) => (
              <FormControlLabel
                key={activity.value}
                control={
                  <Switch
                    {...getFieldProps(activity.value)}
                    checked={values[activity.value]}
                  />
                }
                label={activity.label}
              />
            ))}
          </FormGroup>

          <Box sx={{ mt: 3, mb: 5 }}>
            <FormGroup>
              <Typography
                paragraph
                variant="overline"
                sx={{ color: 'text.secondary' }}
              >
                Application
              </Typography>
              {APPLICATION_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item.value}
                  control={
                    <Switch
                      {...getFieldProps(item.value)}
                      checked={values[item.value]}
                    />
                  }
                  label={item.label}
                />
              ))}
            </FormGroup>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              pending={isSubmitting}
            >
              Save Changes
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </Card>
  );
}
