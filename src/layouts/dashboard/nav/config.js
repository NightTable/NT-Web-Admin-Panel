// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [

  {
    title: 'Table Configurations',
    path: '/dashboard/tableconfig',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'Reservations',
  //   path: '/dashboard/reservations',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'Events',
    path: '/dashboard/events',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'Polling Requests',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Menu Items',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // }, 
  // {
  //   title: 'Representative',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // }, {
  //   title: 'Settings',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // }, 
  {
    title: 'Clubs',
    path: '/dashboard/clubs',
    icon: icon('ic_lock'),
  },
  
];

export default navConfig;
