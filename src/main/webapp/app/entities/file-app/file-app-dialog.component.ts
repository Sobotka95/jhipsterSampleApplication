import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FileApp } from './file-app.model';
import { FileAppPopupService } from './file-app-popup.service';
import { FileAppService } from './file-app.service';

@Component({
    selector: 'jhi-file-app-dialog',
    templateUrl: './file-app-dialog.component.html'
})
export class FileAppDialogComponent implements OnInit {

    fileApp: FileApp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private fileAppService: FileAppService,
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
        if (this.fileApp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fileAppService.update(this.fileApp));
        } else {
            this.subscribeToSaveResponse(
                this.fileAppService.create(this.fileApp));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FileApp>>) {
        result.subscribe((res: HttpResponse<FileApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FileApp) {
        this.eventManager.broadcast({ name: 'fileAppListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-file-app-popup',
    template: ''
})
export class FileAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fileAppPopupService: FileAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fileAppPopupService
                    .open(FileAppDialogComponent as Component, params['id']);
            } else {
                this.fileAppPopupService
                    .open(FileAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
