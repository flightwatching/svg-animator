import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import { WorkspaceConfigService } from "./workspace-config/workspace-config.service";
import { WorkspaceConfigAPIService } from "./workspace-config/workspace-config-api.service";
import { DrawService } from "./draw/draw.service";
import { DrawApiService } from "./draw/draw-api.service";
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module'
import { SidebarComponent } from './sidebar/sidebar.component'
import { DashboardToolsComponent } from './sidebar/dashboard-tools/dashboard-tools.component'
import { CollapseModule } from 'ng2-collapse';
import { ConnectorsModule } from './connectors/connectors.module';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardToolsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    CollapseModule,
    ConnectorsModule
  ],
  providers: [
    WorkspaceConfigService,
    WorkspaceConfigAPIService,
    DrawService,
    DrawApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
