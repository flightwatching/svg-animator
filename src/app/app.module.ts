import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    WorkspaceConfigService,
    WorkspaceConfigAPIService,
    DrawService,
    DrawApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('module')
  }
}
