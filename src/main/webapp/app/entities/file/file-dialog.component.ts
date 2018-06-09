import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { File } from './file.model';
import { FilePopupService } from './file-popup.service';
import { FileService } from './file.service';
import { Folder, FolderService } from '../folder';

@Component({
    selector: 'jhi-file-dialog',
    templateUrl: './file-dialog.component.html'
})
export class FileDialogComponent implements OnInit {

    file: File;
    isSaving: boolean;

    folders: Folder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fileService: FileService,
        private folderService: FolderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.folderService.query()
            .subscribe((res: HttpResponse<Folder[]>) => { this.folders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.file.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fileService.update(this.file));
        } else {
            this.subscribeToSaveResponse(
                this.fileService.create(this.file));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<File>>) {
        result.subscribe((res: HttpResponse<File>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: File) {
        this.eventManager.broadcast({ name: 'fileListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFolderById(index: number, item: Folder) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-file-popup',
    template: ''
})
export class FilePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filePopupService: FilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.filePopupService
                    .open(FileDialogComponent as Component, params['id']);
            } else {
                this.filePopupService
                    .open(FileDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
