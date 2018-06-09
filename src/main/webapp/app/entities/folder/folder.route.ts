import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FolderComponent } from './folder.component';
import { FolderDetailComponent } from './folder-detail.component';
import { FolderPopupComponent } from './folder-dialog.component';
import { FolderDeletePopupComponent } from './folder-delete-dialog.component';

export const folderRoute: Routes = [
    {
        path: 'folder',
        component: FolderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'folder/:id',
        component: FolderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const folderPopupRoute: Routes = [
    {
        path: 'folder-new',
        component: FolderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'folder/:id/edit',
        component: FolderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'folder/:id/delete',
        component: FolderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
