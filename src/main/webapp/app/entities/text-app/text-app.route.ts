import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TextAppComponent } from './text-app.component';
import { TextAppDetailComponent } from './text-app-detail.component';
import { TextAppPopupComponent } from './text-app-dialog.component';
import { TextAppDeletePopupComponent } from './text-app-delete-dialog.component';

export const textAppRoute: Routes = [
    {
        path: 'text-app',
        component: TextAppComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextApps'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'text-app/:id',
        component: TextAppDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextApps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const textAppPopupRoute: Routes = [
    {
        path: 'text-app-new',
        component: TextAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'text-app/:id/edit',
        component: TextAppPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'text-app/:id/delete',
        component: TextAppDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextApps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
