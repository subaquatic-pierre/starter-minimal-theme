import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import {
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent,
  CardProps
} from '@material-ui/core';
// redux
import { BillingAddress } from '../../../@types/products';

// ----------------------------------------------------------------------

interface CheckoutBillingInfoProps extends CardProps {
  billing: BillingAddress;
  onBackStep: VoidFunction;
}

export default function CheckoutBillingInfo({
  billing,
  onBackStep,
  sx
}: CheckoutBillingInfoProps) {
  const { receiver, phone, addressType, fullAddress } = billing;

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        title="Billing Address"
        action={
          <Button
            size="small"
            type="button"
            startIcon={<Icon icon={editFill} />}
            onClick={onBackStep}
          >
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {receiver}&nbsp;
          <Typography
            component="span"
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >
            ({addressType})
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {fullAddress}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {phone}
        </Typography>
      </CardContent>
    </Card>
  );
}
