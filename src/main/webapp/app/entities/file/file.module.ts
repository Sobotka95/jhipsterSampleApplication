import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FileService,
    FilePopupService,
    FileComponent,
    FileDetailComponent,
    FileDialogComponent,
    FilePopupComponent,
    FileDeletePopupComponent,
    FileDeleteDialogComponent,
    fileRoute,
    filePopupRoute,
} from './';

const ENTITY_STATES = [
    ...fileRoute,
    ...filePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FileComponent,
        FileDetailComponent,
        FileDialogComponent,
        FileDeleteDialogComponent,
        FilePopupComponent,
        FileDeletePopupComponent,
    ],
    entryComponents: [
        FileComponent,
        FileDialogComponent,
        FilePopupComponent,
        FileDeleteDialogComponent,
        FileDeletePopupComponent,
    ],
    providers: [
        FileService,
        FilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFileModule {}
