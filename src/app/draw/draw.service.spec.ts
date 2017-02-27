/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawService } from './draw.service';
import {DrawApiService} from "./draw-api.service";
import {Observable} from "rxjs";

import Spy = jasmine.Spy;


describe('DrawService', () => {

    let mockDrawApiService: DrawApiService;
    const draws = [
        {name: "draw1", svg: "<svg>draw1</svg>"},
        {name: "draw2", svg: "<svg>draw2</svg>"},
        {name: "draw3", svg: "<svg>draw3</svg>"}
    ];

    beforeEach(() => {
        mockDrawApiService = jasmine.createSpyObj<DrawApiService>('DrawApiService', ['requestDraws']);
        (mockDrawApiService.requestDraws as Spy).and.returnValue(Observable.of(draws));
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DrawService,
                { provide: DrawApiService, useValue: mockDrawApiService },
            ]
        });
    });

    it('Should create the draw service', inject([DrawService], (service: DrawService) => {
        expect(service).toBeTruthy();
    }));

    describe('Retrieve draws', () => {
        it('Should retrieve the correct draw', inject([DrawService], (service: DrawService) => {
            service.getDraw(draws[0].name)
                .subscribe(
                    data => {
                        expect(data.name).toEqual(draws[0].name);
                        expect(data.svg).toEqual(draws[0].svg);
                    },
                    err => fail('should success')
                );
        }));

        it('Shouldn\'t retrieve the draw when is not exist', inject([DrawService], (service: DrawService) => {
            service.getDraw("16516516515151")
                .subscribe(
                    data => {
                        expect(data).toBeUndefined();
                    },
                    err => fail('should success')
                );
        }));
    });
});
