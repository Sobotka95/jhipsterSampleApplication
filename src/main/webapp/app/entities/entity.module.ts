import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationTextAppModule } from './text-app/text-app.module';
import { JhipsterSampleApplicationFileAppModule } from './file-app/file-app.module';
import { JhipsterSampleApplicationNewsModule } from './news/news.module';
import { JhipsterSampleApplicationFolderModule } from './folder/folder.module';
import { JhipsterSampleApplicationFileModule } from './file/file.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationTextAppModule,
        JhipsterSampleApplicationFileAppModule,
        JhipsterSampleApplicationNewsModule,
        JhipsterSampleApplicationFolderModule,
        JhipsterSampleApplicationFileModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
