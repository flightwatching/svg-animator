import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from "rxjs";
import { DrawApiService } from "./draw-api.service";
import { DrawModel } from "./draw.model";

@Injectable()
export class DrawService {

    private draws: Subject<Array<DrawModel>>;

    constructor(private drawApiService: DrawApiService) {
        this.draws = new ReplaySubject(1);
        this.loadDraw();
    }

    getDraws(): Observable<Array<DrawModel>> {
        return this.draws;
    }

    getDraw(name: String): Observable<DrawModel> {
        return this.draws.map(draws => draws.filter(d => d.name === name)[0]);
    }

    private loadDraw() {
        this.drawApiService.requestDraws()
            .retry()
            .subscribe(this.draws);
    }
}
