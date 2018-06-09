import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Folder } from './folder.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Folder>;

@Injectable()
export class FolderService {

    private resourceUrl =  SERVER_API_URL + 'api/folders';

    constructor(private http: HttpClient) { }

    create(folder: Folder): Observable<EntityResponseType> {
        const copy = this.convert(folder);
        return this.http.post<Folder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(folder: Folder): Observable<EntityResponseType> {
        const copy = this.convert(folder);
        return this.http.put<Folder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Folder>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Folder[]>> {
        const options = createRequestOption(req);
        return this.http.get<Folder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Folder[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Folder = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Folder[]>): HttpResponse<Folder[]> {
        const jsonResponse: Folder[] = res.body;
        const body: Folder[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Folder.
     */
    private convertItemFromServer(folder: Folder): Folder {
        const copy: Folder = Object.assign({}, folder);
        return copy;
    }

    /**
     * Convert a Folder to a JSON which can be sent to the server.
     */
    private convert(folder: Folder): Folder {
        const copy: Folder = Object.assign({}, folder);
        return copy;
    }
}
