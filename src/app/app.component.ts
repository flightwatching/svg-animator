import { Component } from '@angular/core';
import { NgGridConfig, NgGridItemConfig } from "angular2-grid";
import {GridConfigService} from "./grid-config/grid-config.service";
import {MdSnackBar} from '@angular/material';


class Box {
	config: NgGridItemConfig;
	svg: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
	private boxes: Array<Box> = [];
	private payloads: number = 0;
    private sidenavOpened = false;

    private gridConfig: NgGridConfig = {};

	constructor(private gridConfigService:GridConfigService, private snackBar: MdSnackBar) {
        this.loadConfiguration();
    }

	addDraw():void {
	    const conf: NgGridItemConfig = this._generateDefaultItemConfig();
        this.payloads++;
        this.boxes[this.payloads] = new Box();
        this.boxes[this.payloads].config = conf;
        this.boxes[this.payloads].svg = "horloge.svg";
        this.boxes[this.payloads].config.payload = this.payloads;
    }


    sideNav():void {
        this.sidenavOpened = !this.sidenavOpened;
    }

    saveConfigurationGrid():void {
	    // Build the configuration to save
        let config = { gridConfig: this.gridConfig, gridItemsConfigs: []};
        this.boxes.map(b => config.gridItemsConfigs.push({ svg: b.svg, config: b.config}));

        this.gridConfigService.saveConfig("default", config)
            .subscribe(
                res => this.snackBar.open("Configuration saved", 'Undo', { duration: 3000 }),
                err => this.snackBar.open(err.message, 'Undo', { duration: 3000 }));
    }

    private loadConfiguration():void {
        this.gridConfigService.getConfig("default.json")
        .subscribe(
            res => {
                this.gridConfig = res.config.gridConfig;
                res.config.gridItemsConfigs.map(itemConfig => this.boxes.push(itemConfig));
            },
            err => {
                console.log(err)
                this.snackBar.open(err.message, 'Undo', { duration: 3000 })
            });
    }

	private _generateDefaultItemConfig(): NgGridItemConfig {
		return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'resizable': true, 'minWidth': 10, 'minHeight': 10, 'sizex': 1, 'sizey': 1 };
	}
}
