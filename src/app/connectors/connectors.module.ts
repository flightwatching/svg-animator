import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectorsRoutingMod } from './connectors-routing.module';
import { ConnectorsEditorComponent } from './connectors-editor/connectors-editor.component';

@NgModule({
    imports: [
        CommonModule,
        ConnectorsRoutingMod
    ],
    declarations: [
        ConnectorsEditorComponent
    ]
})
export class ConnectorsModule { }
