/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TextAppComponent } from '../../../../../../main/webapp/app/entities/text-app/text-app.component';
import { TextAppService } from '../../../../../../main/webapp/app/entities/text-app/text-app.service';
import { TextApp } from '../../../../../../main/webapp/app/entities/text-app/text-app.model';

describe('Component Tests', () => {

    describe('TextApp Management Component', () => {
        let comp: TextAppComponent;
        let fixture: ComponentFixture<TextAppComponent>;
        let service: TextAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TextAppComponent],
                providers: [
                    TextAppService
                ]
            })
            .overrideTemplate(TextAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TextAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TextAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TextApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.textApps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
