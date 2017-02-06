/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, tick, getTestBed} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions, XHRBackend, HttpModule} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { GridConfigService } from './grid-config.service';


describe('GridConfig Service', () => {
    let mockBackend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                GridConfigService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
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

    it('Should get all the configurations grid store on the backend', async(inject([GridConfigService], (gridConfigService) => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => { connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: {
                            configs: [
                                {
                                    "gridConfig": {payload: 0}
                                },
                                {
                                    "gridConfig": {payload: 0}
                                }
                            ]
                        }}
                    )));
        });

        gridConfigService.getConfigs().subscribe(
            (data) => {
                expect(data.configs.length).toEqual(2);
            });
    })));
});
