import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FileAppComponent } from './file-app.component';
import { FileAppDetailComponent } from './file-app-detail.component';
import { FileAppPopupComponent } from './file-app-dialog.component';
import { FileAppDeletePopupComponent } from './file-app-delete-dialog.component';

export const fileAppRoute: Routes = [
    {
        path: 'file-app',
        component: FileAppComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileApps'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'file-app/:id',
        component: FileAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileApps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fileAppPopupRoute: Routes = [
    {
        path: 'file-app-new',
        component: FileAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file-app/:id/edit',
        component: FileAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file-app/:id/delete',
        component: FileAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
