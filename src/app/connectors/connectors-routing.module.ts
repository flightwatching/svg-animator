import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectorsEditorComponent } from './connectors-editor/connectors-editor.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: ConnectorsEditorComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingMod {}