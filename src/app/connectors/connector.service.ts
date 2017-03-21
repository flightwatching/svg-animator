import { Connector } from "./connector.model";
import { Injectable } from '@angular/core';
import { ConnectorAPIService } from "./connector-api.service";
import { MdSnackBar } from '@angular/material';

@Injectable()
export class ConnectorService {
    connectors: Array<Connector>

    constructor(private connectorAPIService:ConnectorAPIService, private snackBar: MdSnackBar) {
    }

    getConnectors(): void {
         this.connectorAPIService.getConnectors()
        .subscribe(
            res => {
                this.connectors = res;
            },
            err => this.snackBar.open(err.message, 'Undo', { duration: 3000 }));
    }    
}


