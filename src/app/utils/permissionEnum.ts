/*

# ADMIN 
    # ADMIN COMPANY
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Compañia', 'DM78E', 1, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Actualizar', 'EN90F', 4, NOW(), NOW());

    # ADMIN TIPOS DE TRATAMIENTO
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Tipos Tratamiento', 'PZ12Q', 1, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Listar', 'QA34R', 16, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Crear', 'RB56S', 16, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Actualizar', 'SC78T', 16, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Eliminar', 'TD90U', 16, NOW(), NOW());

    # ADMIN SUCURSALES
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Sucursales', 'UE12V', 1, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Listar', 'VF34W', 21, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Crear', 'WG56X', 21, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Actualizar', 'XH78Y', 21, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Eliminar', 'YI90Z', 21, NOW(), NOW());

    # TIPOS DE TRATAMIENTO
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Tipos de tratamiento', 'ZJ12A', 1, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Listar', 'AK34B', 26, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Crear', 'BL56C', 26, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Actualizar', 'CM78D', 26, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Eliminar', 'DN90E', 26, NOW(), NOW());

    # DETALLES DE ENFERMEDAD
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Detalles de enfermedad', 'EO12F', 1, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Listar', 'FP34G', 31, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Crear', 'GQ56H', 31, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Actualizar', 'HR78I', 31, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Eliminar', 'IS90J', 31, NOW(), NOW());

    # PACIENTES
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Pacientes', 'JT12K', 2, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Listar', 'KU34L', 36, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Visualizar', 'LV56M', 36, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Crear', 'MW78N', 36, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Actualizar', 'NX90O', 36, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Eliminar', 'OY12P', 36, NOW(), NOW());

    # CITAS
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Citas', 'PZ34Q', 2, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Listar', 'QA56R', 42, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Visualizar', 'RB78S', 42, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Crear', 'SC90T', 42, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Actualizar', 'TD12U', 42, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Eliminar', 'UE34V', 42, NOW(), NOW());

    # TRATAMIENTOS
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Tratamientos', 'VF56W', 2, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Listar', 'WG78X', 48, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Visualizar', 'XH90Y', 48, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Crear', 'YI12Z', 48, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Actualizar', 'ZJ34A', 48, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Eliminar', 'AK56B', 48, NOW(), NOW());

    # PAGOS
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Pagos', 'BL78C', 2, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Listar', 'CM90D', 54, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Visualizar', 'DN12E', 54, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Crear', 'EO34F', 54, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Actualizar', 'FP56G', 54, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Eliminar', 'GQ78H', 54, NOW(), NOW());

    # REPORTES
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Reporte XQ90', 'HR90I', 3, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Reporte FX56', 'IS12J', 3, NOW(), NOW());
INSERT INTO permissiondata (NAME, code, parentId, created_at, updated_at) VALUES ('Reporte F NX12O', 'JT34K', 3, NOW(), NOW());


*/

export enum EPermissions {
    // MODULO
    ADMIN_MODULE = "AJ21B",
    CONTROL_MODULE = "BK34C",
    REPORT_MODULE = "CL56D",

    // ADMIN ROLES
    ADMIN_ROLES = "KU12L",
    LISTAR_ROLES = "LV34M",
    CREAR_ROLES = "MW56N",
    ACTUALIZAR_ROLES = "NX78O",
    ELIMINAR_ROLES = "OY90P",

    // ADMIN USUARIOS
    ADMIN_USUARIOS = "FP12G",
    LISTAR_USUARIOS = "GQ34H",
    CREAR_USUARIOS = "HR56I",
    ACTUALIZAR_USUARIOS = "IS78J",
    ELIMINAR_USUARIOS = "JT90K"
}