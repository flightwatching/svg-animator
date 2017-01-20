import { Component } from '@angular/core';
import { NgGrid } from './angular2-grid/directives/NgGrid';
import { NgGridItem } from './angular2-grid/directives/NgGridItem';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "./angular2-grid/interfaces/INgGrid";

class Box {
	id: number;
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

  title = 'SVG Animator';
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
		'min_width': 250,
		'min_height': 250,
		'fix_to_grid': false,
		'auto_style': true,
		'auto_resize': true,
		'maintain_ratio': true,
		'prefer_new': false,
		'zoom_on_drag': false,
		'limit_to_screen': true
	};

	constructor() {
		//this.boxes = new Array<Box>(4);
		for (var i = 0; i < 4; i++) {
			const conf = this._generateDefaultItemConfig();
			conf.payload = 1 + i;
			this.boxes[i] = new Box();
			this.boxes[i].id = i + 1;
			this.boxes[i].config = conf;
			//this.boxes[i] = { id: i + 1, config: conf, svg: 'assets/examples/astronaute.svg'};
		}
		this.boxes[0].svg = 'normalized_tectonic_plates.svg';
		this.boxes[1].svg = 'astronaute.svg';
		this.boxes[2].svg = 'files.svg';
		this.boxes[3].svg = 'horloge.svg';
	}

	private _generateDefaultItemConfig(): NgGridItemConfig {
		return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'resizable': true, 'minWidth': 10, 'minHeight': 10, 'sizex': 1, 'sizey': 1 };
	}
}
	