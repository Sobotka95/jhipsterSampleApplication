import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FileApp } from './file-app.model';
import { FileAppService } from './file-app.service';

@Component({
    selector: 'jhi-file-app-detail',
    templateUrl: './file-app-detail.component.html'
})
export class FileAppDetailComponent implements OnInit, OnDestroy {

    fileApp: FileApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fileAppService: FileAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFileApps();
    }

    load(id) {
        this.fileAppService.find(id)
            .subscribe((fileAppResponse: HttpResponse<FileApp>) => {
                this.fileApp = fileAppResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFileApps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fileAppListModification',
            (response) => this.load(this.fileApp.id)
        );
    }
}
