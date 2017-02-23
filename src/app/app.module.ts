import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgGridModule } from 'angular2-grid';
import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import { WorkspaceConfigService } from "./workspace-config/workspace-config.service";
import { WorkspaceConfigAPIService } from "./workspace-config/workspace-config-api.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgGridModule,
    MaterialModule.forRoot()
  ],
  providers: [WorkspaceConfigService, WorkspaceConfigAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
