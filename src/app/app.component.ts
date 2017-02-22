import { Component } from '@angular/core';
import { NgGridConfig, NgGridItemConfig } from "angular2-grid";
import {GridConfigService} from "./grid-config/grid-config.service";
import {MdSnackBar} from '@angular/material';
import {DrawService} from "./draw/draw.service";


export class Box {
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
    private sidenavOpened = false;
    private currentConfigName = "default";
    private gridConfig: NgGridConfig = {};
    private draws: Array<any> = [];

    tabGridConfigs: Array<NgGridConfig> = [];

	constructor(private gridConfigService: GridConfigService,
                private snackBar: MdSnackBar,
                private drawService: DrawService) {
        this.loadConfigurations();
        this.loadCurrentConfiguration();
        this.getDraws();
    }

	addDraw(name: string):void {
	    this.boxes.push({
            config: this._generateDefaultItemConfig(),
            svg: name,
        });
    }

    getDraws(): void{
	    this.drawService.getDraws()
            .subscribe(
                data => this.draws = data,
                err => this.snackBar.open("Can't retrieve the draws", 'Undo', { duration: 3000 }));
    }

    sideNav():void {
        this.sidenavOpened = !this.sidenavOpened;
    }

    saveConfigurationGrid():void {
	    // Build the configuration to save
        let config = { gridConfig: this.gridConfig, gridItemsConfigs: []};
        this.boxes.map(b => config.gridItemsConfigs.push({ svg: b.svg, config: b.config}));

        this.gridConfigService.saveConfig(this.currentConfigName, config)
            .subscribe(
                res => this.snackBar.open("Configuration saved", 'Undo', { duration: 3000 }),
                err => this.snackBar.open(err.message, 'Undo', { duration: 3000 }));
    }

    setGridConf(config): void {
        this.gridConfig = config;
        this.currentConfigName = config.name;
        this.boxes = [];
        config.gridItemsConfigs.map(itemConfig => this.boxes.push(itemConfig));
    }

    private loadConfigurations(): void {
         this.gridConfigService.getConfigs()
        .subscribe(
            res => {
                this.tabGridConfigs = res;
            },
            err => this.snackBar.open(err.message, 'Undo', { duration: 3000 }));
    }

    private loadCurrentConfiguration():void {
        this.gridConfigService.getConfig(this.currentConfigName)
        .subscribe(
            res => {
                this.gridConfig = res.config.gridConfig;
                res.config.gridItemsConfigs.map(itemConfig => this.boxes.push(itemConfig));
            },
            err => {
                this.snackBar.open(err.message, 'Undo', { duration: 3000 })
            });
    }

	private _generateDefaultItemConfig(): NgGridItemConfig {
		return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'resizable': true, 'minWidth': 10, 'minHeight': 10, 'sizex': 1, 'sizey': 1 };
	}
}
