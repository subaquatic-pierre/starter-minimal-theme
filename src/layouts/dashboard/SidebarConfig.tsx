// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 22 }}
  />
);

const ICONS = {
  cart: getIcon('ic_cart'),
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'app',
        href: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      {
        title: 'e-commerce',
        href: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.ecommerce
      }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        icon: ICONS.user,
        href: PATH_DASHBOARD.user.root,
        items: [
          {
            title: 'profile',
            href: PATH_DASHBOARD.user.profile
          },
          {
            title: 'cards',
            href: PATH_DASHBOARD.user.cards
          },
          {
            title: 'list',
            href: PATH_DASHBOARD.user.list
          },
          {
            title: 'account',
            href: PATH_DASHBOARD.user.account
          }
        ]
      },

      // MANAGEMENT : E-COMMERCE
      // ----------------------------------------------------------------------
      {
        title: 'e-commerce',
        icon: ICONS.cart,
        href: PATH_DASHBOARD.eCommerce.root,
        items: [
          {
            title: 'shop',
            href: PATH_DASHBOARD.eCommerce.shop
          },
          {
            title: 'product',
            href: PATH_DASHBOARD.eCommerce.productById
          },
          {
            title: 'list',
            href: PATH_DASHBOARD.eCommerce.list
          },
          {
            title: 'checkout',
            href: PATH_DASHBOARD.eCommerce.checkout
          },
          {
            title: 'invoice',
            href: PATH_DASHBOARD.eCommerce.invoice
          }
        ]
      }
    ]
  }
];

export default sidebarConfig;
