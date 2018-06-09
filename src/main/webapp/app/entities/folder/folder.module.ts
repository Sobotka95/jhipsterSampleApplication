import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FolderService,
    FolderPopupService,
    FolderComponent,
    FolderDetailComponent,
    FolderDialogComponent,
    FolderPopupComponent,
    FolderDeletePopupComponent,
    FolderDeleteDialogComponent,
    folderRoute,
    folderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...folderRoute,
    ...folderPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FolderComponent,
        FolderDetailComponent,
        FolderDialogComponent,
        FolderDeleteDialogComponent,
        FolderPopupComponent,
        FolderDeletePopupComponent,
    ],
    entryComponents: [
        FolderComponent,
        FolderDialogComponent,
        FolderPopupComponent,
        FolderDeleteDialogComponent,
        FolderDeletePopupComponent,
    ],
    providers: [
        FolderService,
        FolderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFolderModule {}
