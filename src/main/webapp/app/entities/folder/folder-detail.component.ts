import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Folder } from './folder.model';
import { FolderService } from './folder.service';

@Component({
    selector: 'jhi-folder-detail',
    templateUrl: './folder-detail.component.html'
})
export class FolderDetailComponent implements OnInit, OnDestroy {

    folder: Folder;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private folderService: FolderService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFolders();
    }

    load(id) {
        this.folderService.find(id)
            .subscribe((folderResponse: HttpResponse<Folder>) => {
                this.folder = folderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFolders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'folderListModification',
            (response) => this.load(this.folder.id)
        );
    }
}
