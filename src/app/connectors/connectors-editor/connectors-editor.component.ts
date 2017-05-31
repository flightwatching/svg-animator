import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, NgForm} from '@angular/forms';
import { validApiUrl } from "./validator-editors";
import {Connector} from "../connector.model";
import {ConnectorAPIService} from "../connector-api.service";
import {MdSnackBar} from "@angular/material";
import {UUID} from "angular2-uuid";
import {ConnectorService} from "../connector.service";

@Component({
    selector: 'app-connectors-editor',
    templateUrl: './connectors-editor.component.html',
    styleUrls: ['./connectors-editor.component.css']
})
export class ConnectorsEditorComponent implements OnInit {

    public form: FormGroup;
    private nbOfConnectorInDB: number = 0;

    constructor(private fb: FormBuilder,
                private connectorApiService: ConnectorAPIService,
                private connectorService: ConnectorService,
                private snackBar: MdSnackBar) {}

    ngOnInit() {
        this.retrieveConnectorFromDB();
        
        this.form = this.fb.group({
            connectors: this.fb.array([])
        });
    }
    
    
    public save(form: NgForm): void {
        let connectors = form.value.connectors;
        const controls = <FormArray>this.form.controls['connectors'];
    

        //Create the new connectors
        if(this.nbOfConnectorInDB < controls.length) {
            connectors.filter((c, i) => {
                i >= this.nbOfConnectorInDB;
            })
                      .map(c => this.connectorService.createConnector(c));

        }

        this.connectorApiService.updateConnectors(connectors).subscribe(
            res => this.snackBar.open("Saved", 'Undo', { duration: 3000 }),
            err => this.snackBar.open("Error during save", 'Undo', { duration: 3000 }));
    }
    
    public addEmptyConnector(): void {
        const control = <FormArray>this.form.controls['connectors'];
        const connector = this.initEmptyConnector();
        control.push(connector);
    }
    
    /**
     * Remove a connector in the form and stop it if it's currently running
     * @param index
     */
    public removeConnector(index: number): void {
        const control = <FormArray>this.form.controls['connectors'];
        control.removeAt(index);
        this.connectorService.removeConnector(control.value);
    }
    
    /**
     * Retrieve the connectors store in the DB and
     * fill the connectors form array
     */
    private retrieveConnectorFromDB(): void {
        this.connectorApiService.getConnectors()
            .subscribe(
                connectors => this.fillFormArrayOfConnector(connectors),
                err => this.snackBar.open("Can't retrieve connectors", 'Undo', { duration: 3000 }));
    }
    
    /**
     * Fill the form with connectors retrieve by the rest api
     */
    private fillFormArrayOfConnector(connectors: Array<Connector>): void {
        this.nbOfConnectorInDB = connectors.length;
        connectors.map(c => this.addConnector(c));
    }
    
    /**
     * Convert an connector model to a FormGroup and add it to the connectors formArray
     * @param connector
     */
    private addConnector(connector: Connector): void {
        const control = <FormArray>this.form.controls['connectors'];
        const connectorFormGroup = this.fb.group({
            id: [connector.id, Validators.required],
            apiUrl: [connector.apiUrl, [Validators.required, validApiUrl()]],
            index: [connector.index, Validators.required],
            interval: [connector.interval, Validators.required],
            type: [connector.type.toLowerCase(), Validators.required],
        });
        
        control.push(connectorFormGroup);
    }
    
    private initEmptyConnector(): FormGroup {
        return this.fb.group({
            id: [UUID.UUID().toString(), Validators.required],
            apiUrl: ['', [Validators.required, validApiUrl()]],
            index: ['', Validators.required],
            interval: [1000, Validators.required],
            type: ['pull', Validators.required],
        });
    }
}
