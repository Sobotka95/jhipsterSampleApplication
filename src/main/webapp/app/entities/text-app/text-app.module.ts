import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    TextAppService,
    TextAppPopupService,
    TextAppComponent,
    TextAppDetailComponent,
    TextAppDialogComponent,
    TextAppPopupComponent,
    TextAppDeletePopupComponent,
    TextAppDeleteDialogComponent,
    textAppRoute,
    textAppPopupRoute,
} from './';

const ENTITY_STATES = [
    ...textAppRoute,
    ...textAppPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TextAppComponent,
        TextAppDetailComponent,
        TextAppDialogComponent,
        TextAppDeleteDialogComponent,
        TextAppPopupComponent,
        TextAppDeletePopupComponent,
    ],
    entryComponents: [
        TextAppComponent,
        TextAppDialogComponent,
        TextAppPopupComponent,
        TextAppDeleteDialogComponent,
        TextAppDeletePopupComponent,
    ],
    providers: [
        TextAppService,
        TextAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTextAppModule {}
