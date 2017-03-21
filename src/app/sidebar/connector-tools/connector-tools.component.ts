import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../../connectors/connector.service';
import { Connector } from '../../connectors/connector.model';

@Component({
    selector: 'connector-tools',
    templateUrl: 'connector-tools.component.html',
})
export class ConnectorToolsComponent implements OnInit {
    constructor(public connectorService:ConnectorService){}

    ngOnInit() {
        this.connectorService.getConnectors();
    }
    
    public clickConnector(c: Connector) {

    }
}
