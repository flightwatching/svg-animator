import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { environment } from "../../environments/environment";
import {Observable, Subject, BehaviorSubject, ReplaySubject} from "rxjs";

@Injectable()
export class DrawService {

    draws: Subject<any>;

    constructor(private http : Http) {
        this.draws = new ReplaySubject(1);
        this.loadDraw();
    }

    getDraws(): Observable<any> {
        /*return this.http.get(`${environment.config.API_BASE_URL}draw`)
                .map(res => res.json());*/
        return this.draws;
    }

    private requestDraws(): Observable<any> {
        return this.http.get(`${environment.config.API_BASE_URL}draw`)
            .map(res => res.json().draws);
    }

    private loadDraw() {
        this.requestDraws()
            .retry()
            .subscribe(this.draws);
    }

    getDraw(name: String): Observable<any> {
        return this.draws.map(draws => draws.filter(d => d.name === name)[0]);
    }
}
