import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';
import { DocumentListAll } from './list-all/document-list-all.component';
import { CreateDocumentComponent } from './create/create-document.component';

export const DocumentRouting: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list-all',
          component: DocumentListAll,
          canActivate: [AuthGuard],
          data: {
            permissions: [EPermissions.LISTAR_SUCURSALES]
          }
        },
        {
          path: 'create',
          component: CreateDocumentComponent,
          canActivate: [AuthGuard],
          data: {
            type: 'create',
            permissions: [EPermissions.CREAR_SUCURSALES]
          }
        },
        // {
        //   path: 'edit',
        //   component: CreateBranchComponent,
        //   canActivate: [AuthGuard],
        //   data: {
        //     type: 'edit',
        //     permissions: [EPermissions.ACTUALIZAR_SUCURSALES]
        //   }
        // },
      ],
      
    },
];
