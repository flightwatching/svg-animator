import { Component, OnInit } from '@angular/core';
import { NgGridConfig, NgGridItemConfig } from "angular2-grid";
import {GridConfigService} from "./grid-config/grid-config.service";
import {MdSnackBar} from '@angular/material';


export class Box {
	config: NgGridItemConfig;
	svg: string;
}

export class Config {
    name: String;
    gridConfig: NgGridConfig;
    boxes: Array<Box>;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private numNewConfig = 3;
	private payloads: number = 0;
    private sidenavOpened = false;
    private currentConfigName: String ="default";
    currentConfig: Config;
    configs: Array<Config> = [];


	constructor(private gridConfigService:GridConfigService, private snackBar: MdSnackBar) {}

    ngOnInit(): void {
        this.loadConfigurations();
    }

    private findConfig(name: String): Config {
        for (var i = 0; i < this.configs.length; i++) {
            if (this.configs[i].name == name) {
                return this.configs[i];
            }
        }
        return null;
    }

    private findIConfig(name: String): number {
        for (var i = 0; i < this.configs.length; i++) {
            if (this.configs[i].name == name) {
                return i;
            }
        }
        return null;
    }

    private setConfig(configName: String) {
        this.currentConfig = this.findConfig(configName);
        this.currentConfigName = configName;
    }

    //get all the configs from server and set one according to this.currentConfigName
    private loadConfigurations(): void {
         this.gridConfigService.getConfigs()
        .subscribe(
            res => {
                this.configs = res;
                this.setConfig(this.currentConfigName);
            },
            err => this.snackBar.open(err.message, 'Undo', { duration: 3000 }));
    }

	addDraw():void {
	    const conf: NgGridItemConfig = this._generateDefaultItemConfig();
        this.payloads++;
        this.currentConfig.boxes[this.payloads] = new Box();
        this.currentConfig.boxes[this.payloads].config = conf;
        this.currentConfig.boxes[this.payloads].svg = "horloge.svg";
        this.currentConfig.boxes[this.payloads].config.payload = this.payloads;
    }

    sideNav():void {
        this.sidenavOpened = !this.sidenavOpened;
    }

    saveConfigurationGrid():void {
        this.gridConfigService.saveConfig(this.currentConfig)
            .subscribe(
                res => {
                    this.snackBar.open("Configuration saved", 'Undo', { duration: 3000 });
                    this.loadConfigurations();
                },
                err => this.snackBar.open(err.message, 'Undo', { duration: 3000 }));
    }

    deleteConf(configName) {
        this.gridConfigService.deleteConfig(configName)
            .subscribe(
                res => {
                    this.snackBar.open("Configuration deleted", 'Undo', { duration: 3000 });  
                    //this.configs.slice(this.findIConfig(configName), 1);
                    this.loadConfigurations();
                },
                err => this.snackBar.open(err.message, 'Undo', { duration: 3000 })
            );
    }

    addConf() {
        let newName = 'default'+this.numNewConfig;
        this.gridConfigService.addConfig({name: newName, gridConfig: this.currentConfig.gridConfig, boxes: this.currentConfig.boxes})
            .subscribe(
                res => {
                    this.snackBar.open("Configuration added", 'Undo', { duration: 3000 });
                    this.currentConfigName = newName;
                    this.loadConfigurations();
                    this.numNewConfig++;
                },
                err => this.snackBar.open(err.message, 'Undo', { duration: 3000 })
            );
    }

	private _generateDefaultItemConfig(): NgGridItemConfig {
		return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'resizable': true, 'minWidth': 10, 'minHeight': 10, 'sizex': 1, 'sizey': 1 };
	}
}
