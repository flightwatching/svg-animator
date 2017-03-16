/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { GridItemComponent } from './grid-item.component';
import {Observable} from "rxjs";
import {DrawService} from "../draw/draw.service";
import Spy = jasmine.Spy;
import {SafeHtmlPipe} from "../shared/pipes/safe-html.pipe";
import {MdSnackBar, MaterialModule} from "@angular/material";


describe('GridItemComponent', () => {
  let component: GridItemComponent;
  let fixture: ComponentFixture<GridItemComponent>;
  let mockDrawService: DrawService;
  let mockSnackBar: MdSnackBar;
  const drawStored = {name: "foo", svg: "<svg>foo</svg>", scripts: []};

    beforeEach(() => {
        mockDrawService = jasmine.createSpyObj<DrawService>('DrawService', ['getDraw']);
        (mockDrawService.getDraw as Spy).and.returnValue(Observable.of(drawStored));

        mockSnackBar = jasmine.createSpyObj<MdSnackBar>('MdSnackBar', ['open']);
        (mockSnackBar.open as Spy);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GridItemComponent, SafeHtmlPipe ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: DrawService, useValue: mockDrawService },
                { provide: MdSnackBar, useValue: mockSnackBar },
            ],
            imports: [
                MaterialModule.forRoot()
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridItemComponent);
        component = fixture.componentInstance;
        component.itemConfigs = { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'sizex': 1, 'sizey': 1 };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve his draw by the draw service', () => {
        // When Init
        fixture.whenStable()
        .then(() => {
            // Then
            expect(mockDrawService.getDraw).toHaveBeenCalled();
            expect(component.draw.name).toEqual(drawStored.name);
            expect(component.draw.svg).toEqual(drawStored.svg);
        });
    });

    xit('should show a error to the user when the draw isn\'t retrieve',
        inject(
            [DrawService],
            (drawService: DrawService) => {

                // Specify the stub behaviour for this test.
                drawService.getDraw = jasmine.createSpy(
                    'getDraw').and.throwError("hello");

                fixture.whenStable()
                    .then(() => {
                        expect(drawService.getDraw).toHaveBeenCalled();
                    });
    }));
});
