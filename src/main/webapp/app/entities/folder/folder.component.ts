import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Folder } from './folder.model';
import { FolderService } from './folder.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-folder',
    templateUrl: './folder.component.html'
})
export class FolderComponent implements OnInit, OnDestroy {
folders: Folder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private folderService: FolderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.folderService.query().subscribe(
            (res: HttpResponse<Folder[]>) => {
                this.folders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFolders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Folder) {
        return item.id;
    }
    registerChangeInFolders() {
        this.eventSubscriber = this.eventManager.subscribe('folderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
