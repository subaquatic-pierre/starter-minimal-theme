import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { PATH_DASHBOARD } from './paths';
// guards
import AuthGuard from '../guards/AuthGuard';
// layouts
import DashboardLayout from '../layouts/dashboard';

// ----------------------------------------------------------------------

const DashboardRoutes = {
  path: PATH_DASHBOARD.root,
  guard: AuthGuard,
  layout: DashboardLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.general.app,
      component: lazy(() => import('../views/GeneralApp'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.ecommerce,
      component: lazy(() => import('../views/GeneralEcommerce'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.root,
      component: () => <Redirect to={PATH_DASHBOARD.general.app} />
    },

    // MANAGEMENT : E-COMMERCE
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.shop,
      component: lazy(() => import('../views/EcommerceShop'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.product,
      component: lazy(() => import('../views/EcommerceProductDetails'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.list,
      component: lazy(() => import('../views/EcommerceProductList'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.checkout,
      component: lazy(() => import('../views/EcommerceCheckout'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.invoice,
      component: lazy(() => import('../views/EcommerceInvoice'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.root,
      component: () => <Redirect to={PATH_DASHBOARD.eCommerce.shop} />
    },

    // MANAGEMENT : USER
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.user.profile,
      component: lazy(() => import('../views/UserProfile'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.cards,
      component: lazy(() => import('../views/UserCards'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.list,
      component: lazy(() => import('../views/UserList'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.account,
      component: lazy(() => import('../views/UserAccount'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.root,
      component: () => <Redirect to={PATH_DASHBOARD.user.profile} />
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default DashboardRoutes;
