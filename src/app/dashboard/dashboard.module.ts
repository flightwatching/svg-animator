import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GridItemComponent } from './grid-item/grid-item.component';
import { NgGridModule } from 'angular2-grid';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		DashboardRoutingModule,
		NgGridModule,
		MaterialModule,
        SharedModule,
	],
	declarations: [
		DashboardComponent,
		GridItemComponent
	]
})
export class DashboardModule {}
