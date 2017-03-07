import { Injectable, Inject } from '@angular/core';
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { NgGridConfig } from "angular2-grid";
import { WorkspaceConfigModel } from "./workspace-config.model";

@Injectable()
export class WorkspaceConfigAPIService {

    constructor(private http: Http) { }

    getConfigs(): Observable<Array<WorkspaceConfigModel>> {
        return this.http.get(`${environment.config.API_BASE_URL}grid-config`)
            .map((res: Response) => (res.status === 200)?  res.json() : { status: res.status})
            .catch((error: Response) => {
                if (error.status === 404) {
                    return Observable.throw(new Error(`${error.status} Not Found`));
                }
                else if (error.status >= 500) {
                    return Observable.throw(new Error("Server error, try later"));
                }
                else {
                    return Observable.throw(new Error('No response from server'));
                }
            });
    }

    saveConfig(config: WorkspaceConfigModel): Observable<Response> {
        return this.http.post(`${environment.config.API_BASE_URL}grid-config/${config.name}`, { config: config })
            .map((res: Response) => (res.status === 200)?  { status: res.status, message: res.json().message } : { status: res.status})
            .catch((error: Response) => {
                if (error.status === 400) {
                    return Observable.throw(new Error(`${error.status} ${error.json().message}`));
                }
                else if (error.status >= 500) {
                    return Observable.throw(new Error("Server error, try later"));
                }
                else {
                    return Observable.throw(new Error('No response from server'));
                }
            });
    }

    deleteConfig(configName: String) : Observable<Response> {
        return this.http.post(`${environment.config.API_BASE_URL}grid-config/delete/${configName}`, {})
            .map((res: Response) => (res.status === 200)?  { status: res.status, message: res.json().message } : { status: res.status})
            .catch((error: Response) => {
                if (error.status === 400) {
                    return Observable.throw(new Error(`${error.status} ${error.json().message}`));
                }
                else if (error.status >= 500) {
                    return Observable.throw(new Error("Server error, try later"));
                }
                else {
                    return Observable.throw(new Error('No response from server'));
                }
            });
    }

    addConfig(config: WorkspaceConfigModel) : Observable<Response> {
        return this.http.post(`${environment.config.API_BASE_URL}grid-config/${config.name}`, {config: config})
            .map((res: Response) => (res.status === 200)?  { status: res.status, message: res.json().message } : { status: res.status})
            .catch((error: Response) => {
                if (error.status === 400) {
                    return Observable.throw(new Error(`${error.status} ${error.json().message}`));
                }
                else if (error.status >= 500) {
                    return Observable.throw(new Error("Server error, try later"));
                }
                else {
                    return Observable.throw(new Error('No response from server'));
                }
            });
    }
}