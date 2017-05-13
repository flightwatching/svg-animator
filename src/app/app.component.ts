import {Component, OnInit, Injectable} from '@angular/core';
import {ConnectorService} from "./shared/connectors/connector.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    constructor(private connectorService: ConnectorService) {}
        
        ngOnInit(): void {}
}
