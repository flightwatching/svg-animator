import { Component } from '@angular/core';
import { NgGridConfig, NgGridItemConfig } from "./angular2-grid/interfaces/INgGrid";
import {Http} from "@angular/http";

class Box {
	config: NgGridItemConfig;
	svg: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './angular2-grid/NgGrid.css']
})
export class AppComponent {
	private boxes: Array<Box> = [];
	private payloads: number = 0;

    private gridConfig: NgGridConfig = <NgGridConfig>{
        'margins': [5],
        'draggable': true,
        'resizable': true,
        'max_cols': 0,
        'max_rows': 0,
        'visible_cols': 0,
        'visible_rows': 0,
        'min_cols': 1,
        'min_rows': 1,
        'col_width': 2,
        'row_height': 2,
        'cascade': 'up',
        'min_width': 50,
        'min_height': 50,
        'fix_to_grid': false,
        'auto_style': true,
        'auto_resize': false,
        'maintain_ratio': false,
        'prefer_new': false,
        'zoom_on_drag': false,
        'limit_to_screen': true
	};

	constructor(private http:Http) {
        this.loadConfiguration();
	}

	addDraw():void {
        const conf: NgGridItemConfig = this._generateDefaultItemConfig();
        this.payloads++;
        this.boxes[this.payloads] = new Box();
        this.boxes[this.payloads].config = conf;
        this.boxes[this.payloads].svg = "horloge.svg";
        this.boxes[this.payloads].config.payload = this.payloads;
/*
        this.boxes.push({ config: conf, svg:'horloge.svg' });
*/
    }

    saveConfigurationGrid():void {
        console.log(this.boxes);
    }

    private loadConfiguration():void {
        this.http.get('assets/config/configuration-grid.json')
        .map(res => res.json())
        .subscribe((configs) => {
            this.gridConfig = configs.gridConfig;

            configs.gridItemsConfigs.map((itemConfig) => {
                this.boxes.push(itemConfig);
            });
        });
    }

	private _generateDefaultItemConfig(): NgGridItemConfig {
		return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'resizable': true, 'minWidth': 10, 'minHeight': 10, 'sizex': 1, 'sizey': 1 };
	}
}
