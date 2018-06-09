import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { News } from './news.model';
import { NewsService } from './news.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-news',
    templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit, OnDestroy {
news: News[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private newsService: NewsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.newsService.query().subscribe(
            (res: HttpResponse<News[]>) => {
                this.news = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: News) {
        return item.id;
    }
    registerChangeInNews() {
        this.eventSubscriber = this.eventManager.subscribe('newsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
