import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { File } from './file.model';
import { FileService } from './file.service';

@Component({
    selector: 'jhi-file-detail',
    templateUrl: './file-detail.component.html'
})
export class FileDetailComponent implements OnInit, OnDestroy {

    file: File;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fileService: FileService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFiles();
    }

    load(id) {
        this.fileService.find(id)
            .subscribe((fileResponse: HttpResponse<File>) => {
                this.file = fileResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFiles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fileListModification',
            (response) => this.load(this.file.id)
        );
    }
}
