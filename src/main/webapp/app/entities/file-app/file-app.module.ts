import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FileAppService,
    FileAppPopupService,
    FileAppComponent,
    FileAppDetailComponent,
    FileAppDialogComponent,
    FileAppPopupComponent,
    FileAppDeletePopupComponent,
    FileAppDeleteDialogComponent,
    fileAppRoute,
    fileAppPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fileAppRoute,
    ...fileAppPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FileAppComponent,
        FileAppDetailComponent,
        FileAppDialogComponent,
        FileAppDeleteDialogComponent,
        FileAppPopupComponent,
        FileAppDeletePopupComponent,
    ],
    entryComponents: [
        FileAppComponent,
        FileAppDialogComponent,
        FileAppPopupComponent,
        FileAppDeleteDialogComponent,
        FileAppDeletePopupComponent,
    ],
    providers: [
        FileAppService,
        FileAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFileAppModule {}
