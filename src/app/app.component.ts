import { Component, OnInit } from '@angular/core';
// import { WorkspaceConfigService } from "./workspace-config/workspace-config.service";
// import {MdSnackBar} from '@angular/material';
// import {DrawService} from "./draw/draw.service";
// import { UUID } from 'angular2-uuid';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	// constructor(public workspaceConfigService:WorkspaceConfigService,
 //                private snackBar: MdSnackBar,
 //                private drawService: DrawService) {
 //    }

    ngOnInit(): void {}

	// addDraw(name: string): void {
 //        this.workspaceConfigService.currentConfig.boxes.push({
 //            id: UUID.UUID(),
 //            config: { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'sizex': 1, 'sizey': 1 },
 //            svg: name,
 //        });
 //    }

}
