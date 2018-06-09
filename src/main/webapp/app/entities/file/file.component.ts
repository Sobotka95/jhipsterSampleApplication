import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { File } from './file.model';
import { FileService } from './file.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-file',
    templateUrl: './file.component.html'
})
export class FileComponent implements OnInit, OnDestroy {
files: File[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fileService: FileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fileService.query().subscribe(
            (res: HttpResponse<File[]>) => {
                this.files = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: File) {
        return item.id;
    }
    registerChangeInFiles() {
        this.eventSubscriber = this.eventManager.subscribe('fileListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
