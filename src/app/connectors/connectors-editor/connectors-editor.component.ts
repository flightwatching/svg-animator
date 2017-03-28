import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validApiUrl } from "./validator-editors";

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
            apiUrl: ['', Validators.required, validApiUrl],
            interval: [10, Validators.required],
            name: ['', Validators.required],
        });
    }
}
