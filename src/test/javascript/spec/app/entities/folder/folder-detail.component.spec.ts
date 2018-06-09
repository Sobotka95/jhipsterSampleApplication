/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FolderDetailComponent } from '../../../../../../main/webapp/app/entities/folder/folder-detail.component';
import { FolderService } from '../../../../../../main/webapp/app/entities/folder/folder.service';
import { Folder } from '../../../../../../main/webapp/app/entities/folder/folder.model';

describe('Component Tests', () => {

    describe('Folder Management Detail Component', () => {
        let comp: FolderDetailComponent;
        let fixture: ComponentFixture<FolderDetailComponent>;
        let service: FolderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FolderDetailComponent],
                providers: [
                    FolderService
                ]
            })
            .overrideTemplate(FolderDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FolderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FolderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Folder(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.folder).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
