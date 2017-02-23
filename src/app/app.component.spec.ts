/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgGridModule } from "angular2-grid";
import {MaterialModule, MdSnackBar} from "@angular/material";
import {} from 'jasmine';
import Spy = jasmine.Spy;
import {GridConfigService} from "./grid-config/grid-config.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Observable} from "rxjs";


describe('AppComponent', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let el: DebugElement;
    let mockGridConfigService: GridConfigService;


    beforeEach(() => {
        mockGridConfigService = jasmine.createSpyObj<GridConfigService>('GridConfigService', ['getConfigs', 'getConfig', 'saveConfig']);
        (mockGridConfigService.saveConfig as Spy).and.returnValue(Observable.of(1));
        (mockGridConfigService.getConfig as Spy).and.returnValue(Observable.of({ config:{ gridConfig: {}, gridItemsConfigs: []}}));
        (mockGridConfigService.getConfigs as Spy).and.returnValue(Observable.of([{ config:{ gridConfig: {}, gridItemsConfigs: []}}]));
    });

    beforeEach(async(() =>
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: GridConfigService, useValue: mockGridConfigService },
                MdSnackBar
            ],
            imports: [
                NgGridModule,
                MaterialModule.forRoot()
            ]
        }).compileComponents()
    ));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.autoDetectChanges();
    });

    it('should create the app', async(() => {
        expect(component).toBeTruthy();
    }));

    describe("Configuration", () => {
        let selectedElement: DebugElement;

        beforeEach(async(() => {
            fixture.whenStable().then(() => {
                /* Given */
                selectedElement = el.query(By.css('#save-config'));
                /* When  */
                selectedElement.nativeElement.click();
            });
        }));

        it('Should save the grid configuration', async(() => {
            fixture.whenStable()
            .then(() => {
                expect(mockGridConfigService.saveConfig).toHaveBeenCalled();
            });
        }));
    });

    xdescribe("Close svg", () => {

        beforeEach(async(() => {
            fixture.whenStable().then(() => {
                let button = fixture.debugElement.nativeElement.querySelector('btn-del');
                button.click();
            });
        }));

        it('Should close the svg', async(() => {
            fixture.whenStable().then(() => {
                expect(component.closeSVG).toHaveBeenCalled();
            });
        }));
    });

});

