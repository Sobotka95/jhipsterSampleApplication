import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TextApp } from './text-app.model';
import { TextAppPopupService } from './text-app-popup.service';
import { TextAppService } from './text-app.service';

@Component({
    selector: 'jhi-text-app-dialog',
    templateUrl: './text-app-dialog.component.html'
})
export class TextAppDialogComponent implements OnInit {

    textApp: TextApp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private textAppService: TextAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.textApp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.textAppService.update(this.textApp));
        } else {
            this.subscribeToSaveResponse(
                this.textAppService.create(this.textApp));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TextApp>>) {
        result.subscribe((res: HttpResponse<TextApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TextApp) {
        this.eventManager.broadcast({ name: 'textAppListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-text-app-popup',
    template: ''
})
export class TextAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private textAppPopupService: TextAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.textAppPopupService
                    .open(TextAppDialogComponent as Component, params['id']);
            } else {
                this.textAppPopupService
                    .open(TextAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
