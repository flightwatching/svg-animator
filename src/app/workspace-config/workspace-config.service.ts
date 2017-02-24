import { Injectable } from "@angular/core";
import {MdSnackBar} from '@angular/material';
import { WorkspaceConfigAPIService } from './workspace-config-api.service';
import { WorkspaceConfigModel } from './workspace-config.model';
import { NgGridConfig, NgGridItemConfig } from "angular2-grid";
import { Box } from "../box.model";

@Injectable()
export class WorkspaceConfigService {
    private numNewConfig = 3;
    currentConfig: WorkspaceConfigModel;
    configs: Array<WorkspaceConfigModel> = [];
    currentConfigName: String ="default";
    gridConfig: NgGridConfig;

	constructor(private workspaceConfigAPIService:WorkspaceConfigAPIService, private snackBar: MdSnackBar) {
        this.gridConfig = this.generateDefaultGridConfig();
    }

    setConfig(configName: String) {
        this.currentConfig = this.findConfig(configName);
        this.currentConfigName = configName;
    }

    //get all the configs from server and set one according to this.currentConfigName
    loadConfigurations(): void {
         this.workspaceConfigAPIService.getConfigs()
        .subscribe(
            res => {
                this.configs = res;
                this.setConfig(this.currentConfigName);
            },
            err => this.snackBar.open(err.message, 'Undo', { duration: 3000 }));
    }    

    saveConfigurationGrid():void {
        this.workspaceConfigAPIService.saveConfig(this.currentConfig)
            .subscribe(
                res => {
                    this.snackBar.open("Configuration saved", 'Undo', { duration: 3000 });
                },
                err => this.snackBar.open(err.message, 'Undo', { duration: 3000 }));
    }

    deleteConf(configName) {
        this.workspaceConfigAPIService.deleteConfig(configName)
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
        let newConfig: WorkspaceConfigModel; 

        newConfig = {name: newName, boxes: []};

        this.workspaceConfigAPIService.addConfig(newConfig)
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

    private findConfig(name: String): WorkspaceConfigModel {
        for (var i = 0; i < this.configs.length; i++) {
            if (this.configs[i].name == name) {
                return this.configs[i];
            }
        }
        return null;
    }

    private generateDefaultArrayBoxConfig(): Box[] {
        return [{ svg: "example.svg", config: this.generateDefaultItemConfig() }];
    }

	private generateDefaultItemConfig(): NgGridItemConfig {
		return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'resizable': true, 'minWidth': 10, 'minHeight': 10, 'sizex': 1, 'sizey': 1 };
	}

    private generateDefaultGridConfig(): NgGridConfig {
        return {
            "margins":[5],
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