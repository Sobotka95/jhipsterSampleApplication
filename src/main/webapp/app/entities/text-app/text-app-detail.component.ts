import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TextApp } from './text-app.model';
import { TextAppService } from './text-app.service';

@Component({
    selector: 'jhi-text-app-detail',
    templateUrl: './text-app-detail.component.html'
})
export class TextAppDetailComponent implements OnInit, OnDestroy {

    textApp: TextApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private textAppService: TextAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTextApps();
    }

    load(id) {
        this.textAppService.find(id)
            .subscribe((textAppResponse: HttpResponse<TextApp>) => {
                this.textApp = textAppResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTextApps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'textAppListModification',
            (response) => this.load(this.textApp.id)
        );
    }
}
