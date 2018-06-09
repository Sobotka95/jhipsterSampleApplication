/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TextAppDetailComponent } from '../../../../../../main/webapp/app/entities/text-app/text-app-detail.component';
import { TextAppService } from '../../../../../../main/webapp/app/entities/text-app/text-app.service';
import { TextApp } from '../../../../../../main/webapp/app/entities/text-app/text-app.model';

describe('Component Tests', () => {

    describe('TextApp Management Detail Component', () => {
        let comp: TextAppDetailComponent;
        let fixture: ComponentFixture<TextAppDetailComponent>;
        let service: TextAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TextAppDetailComponent],
                providers: [
                    TextAppService
                ]
            })
            .overrideTemplate(TextAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TextAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TextAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TextApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.textApp).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
