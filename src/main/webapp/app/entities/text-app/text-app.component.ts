import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TextApp } from './text-app.model';
import { TextAppService } from './text-app.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-text-app',
    templateUrl: './text-app.component.html'
})
export class TextAppComponent implements OnInit, OnDestroy {
textApps: TextApp[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private textAppService: TextAppService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.textAppService.query().subscribe(
            (res: HttpResponse<TextApp[]>) => {
                this.textApps = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTextApps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TextApp) {
        return item.id;
    }
    registerChangeInTextApps() {
        this.eventSubscriber = this.eventManager.subscribe('textAppListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
