import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { DrawModel } from "./draw.model"

@Injectable()
export class DrawApiService {

    constructor(private http :Http) {}

    public requestDraws(): Observable<Array<DrawModel>> {
        return this.http.get(`${environment.config.API_BASE_URL}draw`)
            .map(res => res.json().draws);
    }
}
