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

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    GridItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgGridModule,
    MaterialModule.forRoot()
  ],
  providers: [
    WorkspaceConfigService,
    WorkspaceConfigAPIService,
    DrawService,
    DrawApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
