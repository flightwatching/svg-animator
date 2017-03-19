import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingMod } from './connectors-routing.module';
import { ConnectorsEditorComponent } from './connectors-editor/connectors-editor.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingMod
    ],
    declarations: [
        ConnectorsEditorComponent
    ]
})
export class ConnectorsModule { }
