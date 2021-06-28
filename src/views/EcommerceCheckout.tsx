import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import {
  Box,
  Grid,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// redux
import {
  getCart,
  resetCart,
  onGotoStep,
  deleteCart,
  onBackStep,
  onNextStep,
  applyDiscount,
  applyShipping,
  createBilling,
  increaseQuantity,
  decreaseQuantity
} from '../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// hooks
import useIsMountedRef from '../hooks/useIsMountedRef';
// components
import Page from '../components/Page';
import HeaderDashboard from '../components/HeaderDashboard';
import {
  CheckoutCart,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress
} from '../components/e-commerce/checkout';
import { BillingAddress as Address, ProductState } from '../@types/products';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)'
  },
  active: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  completed: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  line: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider
  }
}))(StepConnector);

function QontoStepIcon({
  active,
  completed
}: {
  active: boolean;
  completed: boolean;
}) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'divider',
        bgcolor: 'background.default'
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Box>
  );
}

export default function EcommerceCheckout() {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { checkout } = useSelector(
    (state: { product: ProductState }) => state.product
  );
  const {
    cart,
    total,
    billing,
    discount,
    subtotal,
    shipping,
    activeStep
  } = checkout;
  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };

  const handleResetStep = () => {
    dispatch(resetCart());
    history.push(PATH_DASHBOARD.eCommerce.shop);
  };

  const handleDeleteCart = (productId: string) => {
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value: number) => {
    dispatch(applyDiscount(value));
  };

  const handleApplyShipping = (value: number) => {
    dispatch(applyShipping(value));
  };

  const handleCreateBilling = (value: Address) => {
    dispatch(createBilling(value));
  };

  const renderContent = () => {
    if (activeStep === 1) {
      return (
        <CheckoutBillingAddress
          total={total}
          subtotal={subtotal}
          discount={discount}
          onBackStep={handleBackStep}
          onNextStep={handleNextStep}
          onCreateBilling={handleCreateBilling}
        />
      );
    }
    if (activeStep === 2 && billing) {
      return (
        <CheckoutPayment
          total={total}
          billing={billing}
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          onBackStep={handleBackStep}
          onComplete={handleNextStep}
          onGotoStep={handleGotoStep}
          onApplyShipping={handleApplyShipping}
        />
      );
    }
    return (
      <CheckoutCart
        cart={cart}
        total={total}
        subtotal={subtotal}
        discount={discount}
        onNextStep={handleNextStep}
        onDelete={handleDeleteCart}
        onApplyDiscount={handleApplyDiscount}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
    );
  };

  return (
    <Page title="Ecommerce: Checkout | Minimal-UI">
      <Container>
        <HeaderDashboard
          heading="Checkout"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Checkout' }
          ]}
        />

        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {isComplete ? (
          <CheckoutOrderComplete
            isComplete={isComplete}
            onReset={handleResetStep}
          />
        ) : (
          renderContent()
        )}
      </Container>
    </Page>
  );
}
