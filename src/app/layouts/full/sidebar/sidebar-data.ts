import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
    permissions: ["Dashboard:Listar"] 
  },
  // {
  //   displayName: 'Login',
  //   iconName: 'lock',
  //   route: '/authentication/login',
  // },
  {
    navCap: "Administración"
  },
  {
    displayName: "Roles",
    iconName: "user",
    route: "role/list",
    permissions: ["Roles:Listar"] // Sin restricciones
  },
  {
    displayName: "Usuarios",
    iconName: "user",
    route: "user/list",
    permissions: ["Usuarios:Listar"] // Sin restricciones
  },
  {
    displayName: "Sucursales",
    iconName: "home",
    route: "branch/list",
    permissions: ["Sucursales:Listar"] // Sin restricciones
  },
  {
    navCap: "Información General"
  },
  {
    displayName: "Pacientes",
    iconName: "user",
    route: "patient/list",
    permissions: ["Pacientes:Listar"]
  },
  {
    displayName: "Detalles de Diagnóstico",
    iconName: "user",
    route: "illnessDetail/list",
    permissions: ["Diágnosticos:Listar"]
  },
  {
    displayName: "Tipos de Tratamiento",
    iconName: "user",
    route: "treatmentType/list",
    permissions: ["TipoTratamientos:Listar"]
  },
  {
    displayName: "Citas",
    iconName: "calendar",
    route: "date/calendar",
    permissions: ["Citas:Listar"] 
  },
  {
    displayName: "Tratamientos",
    iconName: "user",
    route: "treatment/list",
    permissions: ["Tratamientos:Listar"] 
  },
  {
    displayName: "Pagos de Tratamientos",
    iconName: "brand-visa",
    route: "payment/makePayment",
    permissions: ["Pagos:Listar"] 
  },
  {
    displayName: "Reportes",
    iconName: "report",
    route: "report/general",
    permissions: ["Reportes:Listar"] 
  },
];
