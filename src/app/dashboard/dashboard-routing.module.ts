import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: DashboardComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}