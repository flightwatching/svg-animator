import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Connector } from "./connector.model";
import { StoreService } from "../../connectors/store.service";
import { StateConnector } from "../../connectors/state.enum";
import {ConnectorAPIService} from "./connector-api.service";
import 'rxjs/add/observable/interval';

/**
 * This service job is to manage an array of connectors which receive data
 * by subscribing to an external API (we have 2 strategies: polling and pushing with websocket)
 *
 */
@Injectable()
export class ConnectorService {
    
    private connectors$: Array<Observable<any>>;
    
    constructor(private http : Http,
                private store: StoreService,
                private connectorApi: ConnectorAPIService) {
        this.connectors$ = [];
        this.loadConnectorStoreInDB();
    }
    
    /**
     * Add a new running connector
     * @param Connector : connector
     */
    public addConnector(connector: Connector): void {
        this.createConnector(connector);
    }
    
    /**
     * Send complete to the Observable and remove it
     * @param connector
     */
    public removeConnector(index: number) {
        //TODO Add the complete signal for close proper the Observable
        if (index > -1) {
            this.connectors$.splice(index, 1);
        }
    }
    
    private loadConnectorStoreInDB() {
        this.connectorApi.getConnectors().subscribe(
            connectors => connectors.map(c => this.addConnector(c)),
            err => console.error(err.message));
    }
    
    /**
     * "Factory" of connectors
     * When a connector is create.
     * He will start to pull the data of the external api.
     * @param Connector : connector
     */
    private createConnector(connector: Connector): void {
        if(connector.type === "pull") {
            this.makePullConnector(connector)
        }
        else {
            //TODO implement push connector
            console.warn("Not implemented yet !");
        }
    }
    
    private makePullConnector(c: Connector) {
        this.connectors$.push(this.startPollingExternalApi(c));
        this.startPushingDataFromExternalApiToStore(c, this.connectors$[this.connectors$.length - 1]);
    }
    
    private startPollingExternalApi(connector: Connector): Observable<any> {
        return Observable.interval(connector.interval)
            .flatMap(() =>
                this.http.get(connector.apiUrl)
                    .map(this.extractDataPayload)
            )
            .distinct()
            .retryWhen(errors => errors
                .do(_ => connector.status = StateConnector.ERROR)
                .delayWhen(val => Observable.timer(10000))
            )
            .catch(err => {
                connector.status = StateConnector.ERROR;
                return Observable.throw(new Error(err));
            });
    }
    
    private startPushingDataFromExternalApiToStore(connector: Connector, obsvervableRemoteApi$ : Observable<any>): void {
        connector.observable = obsvervableRemoteApi$;
        connector.status = StateConnector.RUNNING;
        obsvervableRemoteApi$.subscribe(
            data => this.store.putDataInStore(connector.index, data),
            error => StateConnector.ERROR,
            () => connector.status = StateConnector.STOPED);
    }
    
    private extractDataPayload(res: Response): Object {
        let body = res.json();
        return body;
    }
}
