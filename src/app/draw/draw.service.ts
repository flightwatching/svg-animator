import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { environment } from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class DrawService {

    constructor(private http : Http) {}

    getDraws(): Observable<any> {
        return this.http.get(`${environment.config.API_BASE_URL}draw`)
                .map(res => res.json());
    }
}
