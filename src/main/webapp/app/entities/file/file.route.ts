import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FileComponent } from './file.component';
import { FileDetailComponent } from './file-detail.component';
import { FilePopupComponent } from './file-dialog.component';
import { FileDeletePopupComponent } from './file-delete-dialog.component';

export const fileRoute: Routes = [
    {
        path: 'file',
        component: FileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'file/:id',
        component: FileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filePopupRoute: Routes = [
    {
        path: 'file-new',
        component: FilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file/:id/edit',
        component: FilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file/:id/delete',
        component: FileDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
