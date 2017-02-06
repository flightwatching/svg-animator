/* tslint:disable:no-unused-variable */
import {TestBed, async, inject, getTestBed} from '@angular/core/testing';
import {BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseType} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { GridConfigService } from './grid-config.service';
import {NgGridConfig} from "angular2-grid";


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

    describe('Retrieve grid configuration', () => {
        it('Should get all the configurations grid store on the backend', async(inject([GridConfigService], (gridConfigService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockRespond(new Response(
                    new ResponseOptions({
                            status : 200,
                            body:[
                                {
                                    'margins': [10],
                                    'draggable': true,
                                    'resizable': true,
                                    'max_cols': 0,
                                    'max_rows': 0,
                                    'visible_cols': 0,
                                    'visible_rows': 0,
                                    'min_cols': 0,
                                    'min_rows': 0,
                                },
                                {
                                    'col_width': 250,
                                    'row_height': 250,
                                    'cascade': 'up',
                                    'min_width': 100,
                                    'min_height': 100,
                                    'fix_to_grid': false,
                                    'auto_style': true,
                                    'auto_resize': false,
                                    'maintain_ratio': false,
                                    'prefer_new': false,
                                    'limit_to_screen': false
                                }
                            ]
                        }
                    )));
                });

            gridConfigService.getConfigs().subscribe(
                (data: Array<NgGridConfig>) => {
                    expect(data.length).toEqual(2);
                });
        })));

        it('Should retrieve a grid configuration', async(inject([GridConfigService], (gridConfigService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockRespond(new Response(
                    new ResponseOptions({
                            status : 200,
                            body: {
                                config: { 'margins': [10], 'draggable': true, 'resizable': true,}
                            }
                        }
                    )));
                });

            gridConfigService.getConfig("default").subscribe(
                (data) => {
                    expect(data.status).toEqual(200);
                    expect(data.config).toBeDefined();
                });
        })));

        it('Should retrieve any grid configuration when any config name is passed', async(inject([GridConfigService], (gridConfigService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockRespond(new Response(
                    new ResponseOptions({
                            status : 200,
                            body:[]
                        }
                    )));
                });

            gridConfigService.getConfigs().subscribe(
                (data: Array<NgGridConfig>) => {
                    expect(data.length).toEqual(0);
                });
        })));

        it('Should retrieve a empty grid configuration', async(inject([GridConfigService], (gridConfigService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockRespond(new Response(
                    new ResponseOptions({
                            status : 204
                        }
                    )));
                });

            gridConfigService.getConfig("notAExistingConfig").subscribe(
                (data) => {
                    expect(data.status).toEqual(204);
                    expect(data.config).toBeUndefined();
                });
        })));

        it('Should retrieve any grid configuration when the request is malformed', async(inject([GridConfigService], (gridConfigService) => {
            let status : number = 400;
            let message : String = "message";

            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockError(<any>new Response(
                    new ResponseOptions({
                            status : status,
                            body: {
                                message: 'message'
                            }
                        }
                    )));
                });

            gridConfigService.getConfig("default").subscribe(
                () => fail('expected error'),
                (err) => {
                    expect(err.message).toEqual(`${status} ${message}`);
                })
        })));

        it('Should get an error when a grid configuration is ask but the server is down', async(inject([GridConfigService], (gridConfigService) => {
            let status : number = 500;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockError(<any>new Response(
                    new ResponseOptions({
                            status : status
                        }
                    )));
                });

            gridConfigService.getConfig("default").subscribe(
                () => fail('expected error'),
                (err) => expect(err.message).toEqual("Server error, try later"));
        })));

        it('Should get a error when the request found nothing', async(inject([GridConfigService], (gridConfigService) => {
            let status : number = 404;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockError(<any>new Response(
                    new ResponseOptions({
                            status : status
                        }
                    )));
                });

            gridConfigService.getConfig("default").subscribe(
                () => fail('expected error'),
                (err) => expect(err.message).toEqual(`${status} Not Found`));
        })));
    });

    describe('Save or update grid configuration', () => {

        it('Should save the grid configuration', async(inject([GridConfigService], (gridConfigService) => {
            let status: number = 200;
            let message: String = "saved!";

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(<any>new Response(
                        new ResponseOptions({
                                status,
                                body: {message}
                            }
                        )));
                });

            gridConfigService.saveConfig("default", {'resizeable': false, 'margins': [5, 10]}).subscribe(
                (res) => {
                    expect(res.status).toEqual(200);
                    expect(res.message).toEqual(message);
                },
                (err) => fail('expected success'));
        })));

        it('Should get 201 when a new grid configuration is saved', async(inject([GridConfigService], (gridConfigService) => {
            let status: number = 201;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(<any>new Response(
                        new ResponseOptions({status}))
                    )
                });

            gridConfigService.saveConfig("default", {'resizeable': false, 'margins': [5, 10]}).subscribe(
                (res) => expect(res.status).toEqual(201),
                (err) => fail('expected success'));
        })));

        it('Should get 400 when a new grid configuration is saved with wrong operator', async(inject([GridConfigService], (gridConfigService) => {
            let status: number = 400;
            let message: String = "Wrong operator";

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(<any>new Response(
                        new ResponseOptions({
                            status,
                            body: {message}
                        }))
                    )
                });

            gridConfigService.saveConfig("default", {'resizeable': false, 'margins': [5, 10]}).subscribe(
                () => fail('expected success'),
                (err) => expect(err.message).toEqual(`${status} ${message}`));

        })));

        it('Should get an error when a grid configuration is saving but the server is down', async(inject([GridConfigService], (gridConfigService) => {
            let status: number = 500;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(<any>new Response(
                        new ResponseOptions({status}))
                    )
                });

            gridConfigService.saveConfig("default", {'resizeable': false, 'margins': [5, 10]}).subscribe(
                () => fail('expected success'),
                (err) => expect(err.message).toEqual("Server error, try later"));

        })));
    });
});
