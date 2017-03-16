import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  //{ path: 'draw', loadChildren: 'app/draw/draw.module#DrawModule' },
  //{ path: 'connector', loadChildren: 'app/connector/connector.module#ConnectorModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
	constructor() {
		console.log("created");
	}
}
