import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    navCap: "Administración"
  },
  {
    displayName: "Roles",
    iconName: "user",
    route: "role/list"
  },
  {
    displayName: "Usuarios",
    iconName: "user",
    route: "user/list"
  },
  {
    displayName: "Sucursales",
    iconName: "home",
    route: "branch/list"
  },
  {
    navCap: "Información General"
  },
  {
    displayName: "Pacientes",
    iconName: "user",
    route: "patient/list"
  },
  {
    displayName: "Detalles de Diagnóstico",
    iconName: "user",
    route: "illnessDetail/list"
  },
  {
    displayName: "Tipos de Tratamiento",
    iconName: "user",
    route: "treatmentType/list"
  },
  {
    displayName: "Citas",
    iconName: "calendar",
    route: "date/calendar"
  },
  {
    displayName: "Tratamientos",
    iconName: "user",
    route: "treatment/list"
  },
  {
    displayName: "Pagos de Tratamientos",
    iconName: "brand-visa",
    route: "payment/makePayment"
  },
  {
    displayName: "Reportes",
    iconName: "report",
    route: "report/general"
  },
  // {
  //   navCap: 'Usuarios',
  // },
  // {
  //   displayName: 'Badge',
  //   iconName: 'rosette',
  //   route: '/ui-components/badge',
  // },
  // {
  //   displayName: 'Chips',
  //   iconName: 'poker-chip',
  //   route: '/ui-components/chips',
  // },
  // {
  //   displayName: 'Lists',
  //   iconName: 'list',
  //   route: '/ui-components/lists',
  // },
  // {
  //   displayName: 'Menu',
  //   iconName: 'layout-navbar-expand',
  //   route: '/ui-components/menu',
  // },
  // {
  //   displayName: 'Tooltips',
  //   iconName: 'tooltip',
  //   route: '/ui-components/tooltips',
  // },
  // {
  //   navCap: 'Autenticación',
  // },

  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   route: '/authentication/register',
  // },
  // {
  //   navCap: 'Extra',
  // },
  // {
  //   displayName: 'Icons',
  //   iconName: 'mood-smile',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'aperture',
  //   route: '/extra/sample-page',
  // },
];
