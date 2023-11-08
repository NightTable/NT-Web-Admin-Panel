// component
import SvgColor from '../../../features/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

export const navAdminConfig = [
  {
    title: 'Menu',
    path: '/dashboard/menu',
    icon: icon('ic_user')
  },
  {
    title: 'Representative',
    path: '/dashboard/representative',
    icon: icon('ic_cart')
  },
  {
    title: 'Events',
    path: '/dashboard/events',
    icon: icon('ic_blog')
  },
  {
    title: 'Clubs',
    path: '/dashboard/Clubs',
    icon: icon('ic_lock')
  }
];

export const navConfig = [
  {
    title: 'Menu',
    path: '/dashboard/menu',
    icon: icon('ic_user')
  },
  {
    title: 'Events',
    path: '/dashboard/events',
    icon: icon('ic_blog')
  }
];

