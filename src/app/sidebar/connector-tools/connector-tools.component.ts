import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../../connectors/connector.service';
import { Connector } from '../../connectors/connector.model';

@Component({
    selector: 'connector-tools',
    templateUrl: 'connector-tools.component.html',
    styleUrls: ['connector-tools.component.css'],
})
export class ConnectorToolsComponent implements OnInit {
    constructor(private connectorService:ConnectorService){}

    ngOnInit() {
        this.connectorService.getConnectors();
    }

    public goOnEditionConnector(c: Connector) {

    }

    public deleteConnector(c: Connector) {

    }
}
