import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgGridModule } from 'angular2-grid';
import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import {GridConfigService} from "./grid-config/grid-config.service";
import {DrawService} from "./draw/draw.service";

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
  providers: [
      GridConfigService,
      DrawService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
