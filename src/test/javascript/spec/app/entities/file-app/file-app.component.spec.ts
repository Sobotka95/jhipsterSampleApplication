/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FileAppComponent } from '../../../../../../main/webapp/app/entities/file-app/file-app.component';
import { FileAppService } from '../../../../../../main/webapp/app/entities/file-app/file-app.service';
import { FileApp } from '../../../../../../main/webapp/app/entities/file-app/file-app.model';

describe('Component Tests', () => {

    describe('FileApp Management Component', () => {
        let comp: FileAppComponent;
        let fixture: ComponentFixture<FileAppComponent>;
        let service: FileAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FileAppComponent],
                providers: [
                    FileAppService
                ]
            })
            .overrideTemplate(FileAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FileApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fileApps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
