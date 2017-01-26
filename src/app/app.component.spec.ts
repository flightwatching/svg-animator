/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgGridModule } from "./angular2-grid/modules/NgGrid.module";
import { MaterialModule } from "@angular/material"; 

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                NgGridModule,
                MaterialModule.forRoot()
            ]
        });
        TestBed.compileComponents();
    });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
