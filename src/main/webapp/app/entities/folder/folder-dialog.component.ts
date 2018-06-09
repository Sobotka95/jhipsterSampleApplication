import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Folder } from './folder.model';
import { FolderPopupService } from './folder-popup.service';
import { FolderService } from './folder.service';
import { FileApp, FileAppService } from '../file-app';

@Component({
    selector: 'jhi-folder-dialog',
    templateUrl: './folder-dialog.component.html'
})
export class FolderDialogComponent implements OnInit {

    folder: Folder;
    isSaving: boolean;

    fileapps: FileApp[];

    folders: Folder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private folderService: FolderService,
        private fileAppService: FileAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.fileAppService.query()
            .subscribe((res: HttpResponse<FileApp[]>) => { this.fileapps = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.folderService.query()
            .subscribe((res: HttpResponse<Folder[]>) => { this.folders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.folder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.folderService.update(this.folder));
        } else {
            this.subscribeToSaveResponse(
                this.folderService.create(this.folder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Folder>>) {
        result.subscribe((res: HttpResponse<Folder>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Folder) {
        this.eventManager.broadcast({ name: 'folderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFileAppById(index: number, item: FileApp) {
        return item.id;
    }

    trackFolderById(index: number, item: Folder) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-folder-popup',
    template: ''
})
export class FolderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private folderPopupService: FolderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.folderPopupService
                    .open(FolderDialogComponent as Component, params['id']);
            } else {
                this.folderPopupService
                    .open(FolderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
