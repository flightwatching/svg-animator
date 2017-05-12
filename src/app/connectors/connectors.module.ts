import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectorsRoutingMod } from './connectors-routing.module';
import { ConnectorsEditorComponent } from './connectors-editor/connectors-editor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MaterialModule } from "@angular/material";
import {ConnectorAPIService} from "./connector-api.service";

@NgModule({
    imports: [
        CommonModule,
        ConnectorsRoutingMod,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [
        ConnectorsEditorComponent
    ],
    providers: [
        ConnectorAPIService
    ]
})
export class ConnectorsModule { }
