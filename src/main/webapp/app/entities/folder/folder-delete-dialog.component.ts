import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Folder } from './folder.model';
import { FolderPopupService } from './folder-popup.service';
import { FolderService } from './folder.service';

@Component({
    selector: 'jhi-folder-delete-dialog',
    templateUrl: './folder-delete-dialog.component.html'
})
export class FolderDeleteDialogComponent {

    folder: Folder;

    constructor(
        private folderService: FolderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.folderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'folderListModification',
                content: 'Deleted an folder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-folder-delete-popup',
    template: ''
})
export class FolderDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private folderPopupService: FolderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.folderPopupService
                .open(FolderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
