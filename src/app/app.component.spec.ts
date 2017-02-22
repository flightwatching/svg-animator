/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgGridModule } from "angular2-grid";
import {MaterialModule, MdSnackBar} from "@angular/material";
import {} from 'jasmine';
import Spy = jasmine.Spy;
import {GridConfigService} from "./grid-config/grid-config.service";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {SafeHtmlPipe} from "./shared/pipes/safe-html.pipe";
import {DrawService} from "./draw/draw.service";


describe('AppComponent', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let el: DebugElement;
    let mockGridConfigService: GridConfigService;
    let mockDrawService: DrawService;

    const draws = [
        {name: "draw1", svg: "<svg>draw1</svg>"},
        {name: "draw2", svg: "<svg>draw2</svg>"},
        {name: "draw3", svg: "<svg>draw3</svg>"}
    ];


    beforeEach(() => {
        mockGridConfigService = jasmine.createSpyObj<GridConfigService>('GridConfigService', ['getConfigs', 'getConfig', 'saveConfig']);
        (mockGridConfigService.saveConfig as Spy).and.returnValue(Observable.of(1));
        (mockGridConfigService.getConfig as Spy).and.returnValue(Observable.of({ config:{ gridConfig: {}, gridItemsConfigs: []}}));
        (mockGridConfigService.getConfigs as Spy).and.returnValue(Observable.of([{ config:{ gridConfig: {}, gridItemsConfigs: []}}]));

        mockDrawService = jasmine.createSpyObj<DrawService>('DrawService', ['getDraws']);
        (mockDrawService.getDraws as Spy).and.returnValue(Observable.of(draws));
    });

    beforeEach(async(() =>
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                SafeHtmlPipe
            ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: GridConfigService, useValue: mockGridConfigService },
                { provide: DrawService, useValue: mockDrawService },
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
                selectedElement = el.query(By.css('.save-btn'));
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
});

