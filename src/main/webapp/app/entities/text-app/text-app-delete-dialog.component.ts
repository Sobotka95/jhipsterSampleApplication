import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TextApp } from './text-app.model';
import { TextAppPopupService } from './text-app-popup.service';
import { TextAppService } from './text-app.service';

@Component({
    selector: 'jhi-text-app-delete-dialog',
    templateUrl: './text-app-delete-dialog.component.html'
})
export class TextAppDeleteDialogComponent {

    textApp: TextApp;

    constructor(
        private textAppService: TextAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.textAppService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'textAppListModification',
                content: 'Deleted an textApp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-text-app-delete-popup',
    template: ''
})
export class TextAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private textAppPopupService: TextAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.textAppPopupService
                .open(TextAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
