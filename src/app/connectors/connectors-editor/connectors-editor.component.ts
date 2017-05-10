import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { validApiUrl } from "./validator-editors";
import {Connector} from "../connector.model";

@Component({
    selector: 'app-connectors-editor',
    templateUrl: './connectors-editor.component.html',
    styleUrls: ['./connectors-editor.component.css']
})
export class ConnectorsEditorComponent implements OnInit {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            connectors: this.fb.array([
                this.initConnector(),
            ])
        });
        
        //this.addConnector();
    }
    
    save(model: Connector) {
        console.log(model);
    }
    
    public addConnector(): void {
        const control = <FormArray>this.form.controls['connectors'];
        const connector = this.initConnector();
        
        control.push(connector);
    }
    
    public removeConnector(index: number): void {
        const control = <FormArray>this.form.controls['connectors'];
        control.removeAt(index);
    }
    
    private initConnector(): FormGroup {
        return this.fb.group({
            apiUrl: ['', [Validators.required, validApiUrl()]],
            index: ['', Validators.required],
            interval: [10, Validators.required],
            type: ['pull', Validators.required],
        });
    }
}
