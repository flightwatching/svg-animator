/* tslint:disable:no-unused-variable */
import {TestBed, async, inject, getTestBed} from '@angular/core/testing';
import {BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseType} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { WorkspaceConfigAPIService } from './workspace-config-api.service';
import {NgGridConfig} from "angular2-grid";
import { WorkspaceConfigModel } from "./workspace-config.model";



describe('GridConfig Service', () => {
    let mockBackend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                WorkspaceConfigAPIService,
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
        it('Should get all the configurations grid store on the backend', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockRespond(new Response(
                    new ResponseOptions({
                            status : 200,
                            body:[
                                {"name":"default","boxes":[{"id":"13f577b3-6193-e218-af02-d42b0c2a52e5","config":{"dragHandle":".handle","col":1,"row":1,"sizex":81,"sizey":43,"resizeHandle":null,"fixed":false,"draggable":true,"resizable":true,"borderSize":25},"svg":"demo"}]},
                                {"name":"default2","boxes":[{"id":"c8e01ef9-6d39-e1e2-041a-6893e8e645fc","svg":"astronaute","config":{"dragHandle":null,"col":51,"row":1,"resizable":true,"minWidth":10,"minHeight":10,"sizex":25,"sizey":25,"payload":1,"resizeHandle":null,"fixed":false,"draggable":true,"borderSize":25}}, {"id":"c6776263-968b-3e73-13bc-ed12eb55c969","svg":"files","config":{"dragHandle":null,"col":26,"row":1,"resizable":true,"minWidth":10,"minHeight":10,"sizex":25,"sizey":25,"payload":2,"resizeHandle":null,"fixed":false,"draggable":true,"borderSize":25}}, {"id":"301650d3-2531-afd7-e2c7-983f81405f7f","svg":"horloge","config":{"dragHandle":null,"col":1,"row":1,"resizable":true,"minWidth":10,"minHeight":10,"sizex":25,"sizey":25,"payload":3,"resizeHandle":null,"fixed":false,"draggable":true,"borderSize":25}}]}
                            ]
                        }
                    )));
                });

            WorkspaceConfigAPIService.getConfigs().subscribe(
                (data: Array<WorkspaceConfigModel>) => {
                    expect(data.length).toEqual(2);
                    data.map( res => expect(res.name).toBeDefined());
                    data.map( res => expect(res.boxes).toBeDefined());

                    data.map( res => res.boxes.map( box => expect(box.id).toBeDefined()));
                    data.map( res => res.boxes.map( box => expect(box.config).toBeDefined()));
                    data.map( res => res.boxes.map( box => expect(box.svg).toBeDefined()));
                });
        })));

        it('Should get an error when grid configurations are asked but the server is down', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
            let status : number = 500;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockError(<any>new Response(
                    new ResponseOptions({
                            status : status
                        }
                    )));
                });

            WorkspaceConfigAPIService.getConfigs().subscribe(
                () => fail('expected error'),
                (err) => expect(err.message).toEqual("Server error, try later"));
        })));

        it('Should get a error when the request found nothing', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
            let status : number = 404;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => { connection.mockError(<any>new Response(
                    new ResponseOptions({
                            status : status
                        }
                    )));
                });

            WorkspaceConfigAPIService.getConfigs().subscribe(
                () => fail('expected error'),
                (err) => expect(err.message).toEqual(`${status} Not Found`));
        })));
    });

    describe('Save grid configuration', () => {

        it('Should save the grid configuration', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
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

            WorkspaceConfigAPIService.saveConfig("default", {'resizeable': false, 'margins': [5, 10]}).subscribe(
                (res) => {
                    expect(res.status).toEqual(200);
                    expect(res.message).toEqual(message);
                },
                (err) => fail('expected success'));
        })));

        it('Should get 201 when a new grid configuration is saved', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
            let status: number = 201;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(<any>new Response(
                        new ResponseOptions({status}))
                    )
                });

            WorkspaceConfigAPIService.saveConfig("default", {'resizeable': false, 'margins': [5, 10]}).subscribe(
                (res) => expect(res.status).toEqual(201),
                (err) => fail('expected success'));
        })));

        it('Should get 400 when a new grid configuration is saved with wrong operator', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
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

            WorkspaceConfigAPIService.saveConfig("default", {'resizeable': false, 'margins': [5, 10]}).subscribe(
                () => fail('expected success'),
                (err) => expect(err.message).toEqual(`${status} ${message}`));

        })));

        it('Should get an error when a grid configuration is saving but the server is down', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
            let status: number = 500;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(<any>new Response(
                        new ResponseOptions({status}))
                    )
                });

            WorkspaceConfigAPIService.saveConfig("default", {'resizeable': false, 'margins': [5, 10]}).subscribe(
                () => fail('expected success'),
                (err) => expect(err.message).toEqual("Server error, try later"));

        })));
    });

    describe('Add a grid configuration', () => {

        it('Should add the grid configuration', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
            let status: number = 200;
            let message: String = "added";

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(<any>new Response(
                        new ResponseOptions({
                                status,
                                body: {message}
                            }
                        )));
                });

            WorkspaceConfigAPIService.addConfig({"name":"default","boxes":[{"id":"13f577b3-6193-e218-af02-d42b0c2a52e5","config":{"dragHandle":".handle","col":1,"row":1,"sizex":81,"sizey":43,"resizeHandle":null,"fixed":false,"draggable":true,"resizable":true,"borderSize":25},"svg":"demo"}]})
            .subscribe(
                (res) => {
                    expect(res.status).toEqual(200);
                    expect(res.message).toEqual(message);
                },
                (err) => fail('expected success'));
        })));

        it('Should get an error when a grid configuration is added but the server is down', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
            let status: number = 500;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(<any>new Response(
                        new ResponseOptions({status}))
                    )
                });

            WorkspaceConfigAPIService.addConfig({"name":"default","boxes":[{"id":"13f577b3-6193-e218-af02-d42b0c2a52e5","config":{"dragHandle":".handle","col":1,"row":1,"sizex":81,"sizey":43,"resizeHandle":null,"fixed":false,"draggable":true,"resizable":true,"borderSize":25},"svg":"demo"}]})
            .subscribe(
                () => fail('expected success'),
                (err) => expect(err.message).toEqual("Server error, try later"));

        })));
    });

    describe('Delete grid configuration', () => {

        it('Should delete the grid configuration', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
            let status: number = 200;
            let message: String = "deleted";

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(<any>new Response(
                        new ResponseOptions({
                                status,
                                body: {message}
                            }
                        )));
                });

            WorkspaceConfigAPIService.deleteConfig("default").subscribe(
                (res) => {
                    expect(res.status).toEqual(200);
                    expect(res.message).toEqual(message);
                },
                (err) => fail('expected success'));
        })));

        it('Should get an error when a grid configuration is deleted but the server is down', async(inject([WorkspaceConfigAPIService], (WorkspaceConfigAPIService) => {
            let status: number = 500;

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError(<any>new Response(
                        new ResponseOptions({status}))
                    )
                });

            WorkspaceConfigAPIService.deleteConfig("default").subscribe(
                () => fail('expected success'),
                (err) => expect(err.message).toEqual("Server error, try later"));

        })));
    });
});
