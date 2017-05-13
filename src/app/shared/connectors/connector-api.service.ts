import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Connector } from "./connector.model";
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import {UUID} from "angular2-uuid";

@Injectable()
export class ConnectorAPIService {

    constructor(private http: Http) {}

    getConnectors(): Observable<Array<Connector>> {
        return this.http.get(`${environment.config.API_BASE_URL}connector`)
            .map((res: Response) => res.json())
            .catch((e: Response) => {
                //TODO improve the error management
                return Observable.throw(new Error("Error happened"));
            });
    }
    
    updateConnectors(connectors: Array<Connector>): Observable<Array<Connector>> {
        return this.http.post(`${environment.config.API_BASE_URL}connector/`, connectors)
            .map((res: Response) => res.status)
            .catch((e: Response) => {
                //TODO improve the error management
                return Observable.throw(new Error("Error happened"));
            });
    }
    
    deleteConnector(id: UUID): Observable<Array<Connector>> {
        return this.http.delete(`${environment.config.API_BASE_URL}connector/${id}`)
            .map((res: Response) => res.status)
            .catch((e: Response) => {
                //TODO improve the error management
                return Observable.throw(new Error("Error happened"));
            });
    }
}