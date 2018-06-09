/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FolderComponent } from '../../../../../../main/webapp/app/entities/folder/folder.component';
import { FolderService } from '../../../../../../main/webapp/app/entities/folder/folder.service';
import { Folder } from '../../../../../../main/webapp/app/entities/folder/folder.model';

describe('Component Tests', () => {

    describe('Folder Management Component', () => {
        let comp: FolderComponent;
        let fixture: ComponentFixture<FolderComponent>;
        let service: FolderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FolderComponent],
                providers: [
                    FolderService
                ]
            })
            .overrideTemplate(FolderComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FolderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FolderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Folder(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.folders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
