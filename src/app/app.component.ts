import { Component, OnInit } from '@angular/core';
import { WorkspaceConfigService } from "./workspace-config/workspace-config.service";
import { NgGridConfig } from "angular2-grid";
import {MdSnackBar} from '@angular/material';
import {DrawService} from "./draw/draw.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private sidenavOpened = false;
    private draws: Array<any> = [];

    tabGridConfigs: Array<NgGridConfig> = [];

	constructor(public workspaceConfigService:WorkspaceConfigService,
                private snackBar: MdSnackBar,
                private drawService: DrawService) {
    }

	addDraw(name: string): void {
        this.workspaceConfigService.currentConfig.boxes.push({
            config: { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'sizex': 1, 'sizey': 1 },
            svg: name,
        });
    }

    getDraws(): void{
	    this.drawService.getDraws()
            .subscribe(
                data => this.draws = data,
                err => this.snackBar.open("Can't retrieve the draws", 'Undo', { duration: 3000 }));
    }

    ngOnInit(): void {
        this.workspaceConfigService.loadConfigurations();
        this.getDraws();
    }

    sideNav():void {

        let btn = document.getElementById("btn-sidenav");
        this.sidenavOpened = !this.sidenavOpened;
        let rightDistance = this.sidenavOpened ? '240px' : '40px' ;
        btn.style.right = rightDistance ;

        // if (this.sidenavOpened) {
        //     for (var i = 240; i>40; i-=1){
        //         setTimeout(function(){ btn.style.right = i + 'px' ; }, 20);
        //     }
        // }else{
        //     for (var i = 40; i<240; i+=1){
        //         setTimeout(function(){ btn.style.right = i + 'px' ; }, 20);
        //     }
        // }
        // this.sidenavOpened = !this.sidenavOpened;

    }

    closeSVG(index):void {
        this.workspaceConfigService.currentConfig.boxes.splice(index, 1);
   }
}
