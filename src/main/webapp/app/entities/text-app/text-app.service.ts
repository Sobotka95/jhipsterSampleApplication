import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TextApp } from './text-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TextApp>;

@Injectable()
export class TextAppService {

    private resourceUrl =  SERVER_API_URL + 'api/text-apps';

    constructor(private http: HttpClient) { }

    create(textApp: TextApp): Observable<EntityResponseType> {
        const copy = this.convert(textApp);
        return this.http.post<TextApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(textApp: TextApp): Observable<EntityResponseType> {
        const copy = this.convert(textApp);
        return this.http.put<TextApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TextApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TextApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<TextApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TextApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TextApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TextApp[]>): HttpResponse<TextApp[]> {
        const jsonResponse: TextApp[] = res.body;
        const body: TextApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TextApp.
     */
    private convertItemFromServer(textApp: TextApp): TextApp {
        const copy: TextApp = Object.assign({}, textApp);
        return copy;
    }

    /**
     * Convert a TextApp to a JSON which can be sent to the server.
     */
    private convert(textApp: TextApp): TextApp {
        const copy: TextApp = Object.assign({}, textApp);
        return copy;
    }
}
