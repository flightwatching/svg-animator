import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GridItemComponent } from './grid-item/grid-item.component';
import { NgGridModule } from 'angular2-grid';
import { MaterialModule } from "@angular/material";
import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';


@NgModule({	
	imports: [
		CommonModule,
		DashboardRoutingModule,
		NgGridModule,
		MaterialModule
	],
	declarations: [
		DashboardComponent,
		GridItemComponent,
		SafeHtmlPipe
	]
})
export class DashboardModule { }
