/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, getTestBed} from '@angular/core/testing';
import { DrawApiService } from './draw-api.service';
import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response} from "@angular/http";

describe('DrawApiService', () => {
    let mockBackend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                DrawApiService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ],
            imports: [
                HttpModule
            ]
        });

        mockBackend = getTestBed().get(MockBackend);
    }));

    it('Should retrieve all draws stored in the backend', async(inject([DrawApiService], (drawApiService) => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => { connection.mockRespond(new Response(
                new ResponseOptions({
                    status: 200,
                    body: {
                        draws: [
                            {name: "draw1", svg: "<svg>draw1</svg>"},
                            {name: "draw2", svg: "<svg>draw2</svg>"},
                            {name: "draw3", svg: "<svg>draw3</svg>"}
                        ]
                    }
                })));
            });

        drawApiService.requestDraws()
            .subscribe(
                draws => {
                    expect(draws.length).toEqual(3);
                },
                err => fail('expected success !'))
    })));

    it('Should retrieves any draws', async(inject([DrawApiService], (drawApiService) => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => { connection.mockError(<any>new Response(
                new ResponseOptions({
                        status : 500,
                        body: {
                            message: 'Cant retrieves draws'
                        }
                    }
                )));
            });

        drawApiService.requestDraws()
            .subscribe(
                succ => {
                    fail('expected error');
                },
                err => expect(err).toBeDefined());
    })));
});
