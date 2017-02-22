import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { environment } from "../../environments/environment";
import {Observable, Subject} from "rxjs";

@Injectable()
export class DrawService {

    draws:Map<String, Subject<String>>

    constructor(private http : Http) {
        this.draws = new Map<string, Subject<String>>();
    }

    getDraws(): Observable<any> {
        return this.http.get(`${environment.config.API_BASE_URL}draw`)
                .map(res => res.json());
    }

    getDraw(name: String): Subject<String>| String {
        if(this.draws.get(name)) {
            return this.draws.get(name);
        }
        else {
            this.draws.set(name, new Subject());
            this.http.get(`${environment.config.API_BASE_URL}draw/${name}`)
                .map((res: Response) => res.json())
                .subscribe(data => this.draws.get(name).next(data));
            return this.draws.get(name);
        }
    }
}
