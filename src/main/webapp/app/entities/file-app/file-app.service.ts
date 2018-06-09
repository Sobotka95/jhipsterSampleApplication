import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FileApp } from './file-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FileApp>;

@Injectable()
export class FileAppService {

    private resourceUrl =  SERVER_API_URL + 'api/file-apps';

    constructor(private http: HttpClient) { }

    create(fileApp: FileApp): Observable<EntityResponseType> {
        const copy = this.convert(fileApp);
        return this.http.post<FileApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(fileApp: FileApp): Observable<EntityResponseType> {
        const copy = this.convert(fileApp);
        return this.http.put<FileApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FileApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FileApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<FileApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FileApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FileApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FileApp[]>): HttpResponse<FileApp[]> {
        const jsonResponse: FileApp[] = res.body;
        const body: FileApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FileApp.
     */
    private convertItemFromServer(fileApp: FileApp): FileApp {
        const copy: FileApp = Object.assign({}, fileApp);
        return copy;
    }

    /**
     * Convert a FileApp to a JSON which can be sent to the server.
     */
    private convert(fileApp: FileApp): FileApp {
        const copy: FileApp = Object.assign({}, fileApp);
        return copy;
    }
}
