import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FileApp } from './file-app.model';
import { FileAppPopupService } from './file-app-popup.service';
import { FileAppService } from './file-app.service';

@Component({
    selector: 'jhi-file-app-delete-dialog',
    templateUrl: './file-app-delete-dialog.component.html'
})
export class FileAppDeleteDialogComponent {

    fileApp: FileApp;

    constructor(
        private fileAppService: FileAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fileAppService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fileAppListModification',
                content: 'Deleted an fileApp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-file-app-delete-popup',
    template: ''
})
export class FileAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fileAppPopupService: FileAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fileAppPopupService
                .open(FileAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
