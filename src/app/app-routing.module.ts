import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
    { path: 'connectors', loadChildren: 'app/connectors/connectors.module#ConnectorsModule' },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    //{ path: 'draw', loadChildren: 'app/draw/draw.module#DrawModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
