import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgGridModule } from 'angular2-grid';
import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import { WorkspaceConfigService } from "./workspace-config/workspace-config.service";
import { WorkspaceConfigAPIService } from "./workspace-config/workspace-config-api.service";
import { DrawService } from "./draw/draw.service";
import { DrawApiService } from "./draw/draw-api.service";
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';
import { GridItemComponent } from './grid-item/grid-item.component';
import { CollapseModule } from 'ng2-collapse';
import { AppRoutingModule } from './app-routing.module';
//import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    GridItemComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgGridModule,
    MaterialModule.forRoot(),
    CollapseModule,
    //DashboardModule,
    AppRoutingModule
  ],
  providers: [
    WorkspaceConfigService,
    WorkspaceConfigAPIService,
    DrawService,
    DrawApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    console.log('module')
  }
}
