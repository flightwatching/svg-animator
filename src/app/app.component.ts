import { Component, OnInit, Input } from '@angular/core';
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
    @Input()
    currentConfig: Config;
    @Input()
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
                },
                err => this.snackBar.open(err.message, 'Undo', { duration: 3000 }));
    }

    deleteConf(configName) {
        this.gridConfigService.deleteConfig(configName)
            .subscribe(
                res => {
                    this.snackBar.open("Configuration deleted", 'Undo', { duration: 3000 });  
                    //this.configs.slice(this.findIConfig(configName), 1);
                    // console.log();
                    this.loadConfigurations();
                },
                err => this.snackBar.open(err.message, 'Undo', { duration: 3000 })
            );
    }

    addConf() {
        let newName = 'default'+this.numNewConfig;
        let newConfig: Config; 

        newConfig = {name: newName, gridConfig: this._generateDefaultGridConfig(), boxes: this._generateDefaultArrayBoxConfig()};

        this.gridConfigService.addConfig(newConfig)
            .subscribe(
                res => {
                    this.snackBar.open("Configuration added", 'Undo', { duration: 3000 });
                    
                    this.configs.push(newConfig);
                    this.setConfig(newName);

                    this.numNewConfig++;
                },
                err => this.snackBar.open(err.message, 'Undo', { duration: 3000 })
            );
    }

    private _generateDefaultArrayBoxConfig(): Box[] {
        return [{ svg: "example.svg", config: this._generateDefaultItemConfig() }];
    }

	private _generateDefaultItemConfig(): NgGridItemConfig {
		return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'resizable': true, 'minWidth': 10, 'minHeight': 10, 'sizex': 1, 'sizey': 1 };
	}

    private _generateDefaultGridConfig(): NgGridConfig {
        return {
            "margins":[
                5
            ],
            "draggable":true,
            "resizable":true,
            "max_cols":0,
            "max_rows":0,
            "visible_cols":0,
            "visible_rows":0,
            "min_cols":1,
            "min_rows":1,
            "col_width":2,
            "row_height":2,
            "cascade":"up",
            "min_width":50,
            "min_height":50,
            "fix_to_grid":false,
            "auto_style":true,
            "auto_resize":false,
            "maintain_ratio":false,
            "prefer_new":false,
            "zoom_on_drag":false,
            "limit_to_screen":true 
        };
    }
}
