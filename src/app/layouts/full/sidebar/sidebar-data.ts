import { EPermissions } from 'src/app/utils/permissionEnum';
import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
    permissions: [EPermissions.ADMIN_MODULE] //  módulo de administración
  },
  {
    navCap: "Administración",
    permissions: [EPermissions.ADMIN_MODULE]
  },
  {
    displayName: "Compañia",
    iconName: "home",
    route: "company/list",
    permissions: [EPermissions.LISTAR_ROLES] // Rol de listar roles pero cambiar para compañia
  },
  {
    displayName: "Roles",
    iconName: "user-shield",
    route: "role/list",
    permissions: [EPermissions.LISTAR_ROLES] // Rol de listar roles
  },
  {
    displayName: "Usuarios",
    iconName: "user",
    route: "user/list",
    permissions: [EPermissions.LISTAR_USUARIOS] // Rol de listar usuarios
  },
  {
    displayName: "Sucursales",
    iconName: "home",
    route: "branch/list",
    permissions: [EPermissions.LISTAR_SUCURSALES] // Rol de listar sucursales
  },
  {
    navCap: "Información General"
  },
  {
    displayName: "Pacientes",
    iconName: "heartbeat",
    route: "patient/list",
    permissions: [EPermissions.LISTAR_PACIENTES] // Rol de listar pacientes
  },
  {
    displayName: "Detalles de Diagnóstico",
    iconName: "heart-rate-monitor",
    route: "illnessDetail/list",
    permissions: [EPermissions.LISTAR_DETALLES_DE_ENFERMEDAD] // Rol de listar detalles de enfermedad
  },
  {
    displayName: "Tipos de Tratamiento",
    iconName: "clipboard-list",
    route: "treatmentType/list",
    permissions: [EPermissions.LISTAR_TIPOS_TRATAMIENTO] // Rol de listar tipos de tratamiento
  },
  {
    displayName: "Citas",
    iconName: "calendar",
    route: "date/calendar",
    permissions: [EPermissions.LISTAR_CITAS] // Rol de listar citas
  },
  {
    displayName: "Tratamientos",
    iconName: "first-aid-kit",
    route: "treatment/list",
    permissions: [EPermissions.LISTAR_TRATAMIENTOS] // Rol de listar tratamientos
  },
  {
    displayName: "Pagos",
    iconName: "brand-visa",
    route: "payment/makePayment",
    permissions: [EPermissions.LISTAR_PAGOS] // Rol de listar pagos
  },
  {
    displayName: "Archivos",
    iconName: "folder",
    route: "document/list-all",
    permissions: [EPermissions.REPORT_XQ90] // Rol de ver archivos pero pendiente de crear el que es 
  },
  {
    displayName: "Reportes",
    iconName: "report",
    route: "report/general",
    permissions: [EPermissions.REPORT_XQ90] // Rol de ver reportes
  },
];
