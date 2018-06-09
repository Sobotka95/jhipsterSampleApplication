import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FileApp } from './file-app.model';
import { FileAppService } from './file-app.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-file-app',
    templateUrl: './file-app.component.html'
})
export class FileAppComponent implements OnInit, OnDestroy {
fileApps: FileApp[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fileAppService: FileAppService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fileAppService.query().subscribe(
            (res: HttpResponse<FileApp[]>) => {
                this.fileApps = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFileApps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FileApp) {
        return item.id;
    }
    registerChangeInFileApps() {
        this.eventSubscriber = this.eventManager.subscribe('fileAppListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
