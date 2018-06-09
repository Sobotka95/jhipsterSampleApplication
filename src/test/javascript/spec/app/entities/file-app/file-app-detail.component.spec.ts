/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FileAppDetailComponent } from '../../../../../../main/webapp/app/entities/file-app/file-app-detail.component';
import { FileAppService } from '../../../../../../main/webapp/app/entities/file-app/file-app.service';
import { FileApp } from '../../../../../../main/webapp/app/entities/file-app/file-app.model';

describe('Component Tests', () => {

    describe('FileApp Management Detail Component', () => {
        let comp: FileAppDetailComponent;
        let fixture: ComponentFixture<FileAppDetailComponent>;
        let service: FileAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FileAppDetailComponent],
                providers: [
                    FileAppService
                ]
            })
            .overrideTemplate(FileAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FileApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fileApp).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
