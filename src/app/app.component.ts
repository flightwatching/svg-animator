import { Component, OnInit, Input } from '@angular/core';
import { WorkspaceConfigService } from "./workspace-config/workspace-config.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private sidenavOpened = false;

	constructor(public workspaceConfigService:WorkspaceConfigService) {}

    // setConfig(configName: String) {
    //     this.workspaceConfigService.setConfig(configName);
    // }

    // deleteConf(configName: String) {
    //     this.workspaceConfigService.deleteConf(configName);
    // }

    // saveConfigurationGrid() {
    //     this.workspaceConfigService.saveConfigurationGrid();
    // }

    // addConf () {
    //     this.workspaceConfigService.addConf();
    // }

    ngOnInit(): void {
        this.workspaceConfigService.loadConfigurations();
        console.log()
    }

    sideNav():void {
        this.sidenavOpened = !this.sidenavOpened;
    }

    closeSVG(index):void {
        this.workspaceConfigService.currentConfig.boxes.splice(index, 1);
   }
}
