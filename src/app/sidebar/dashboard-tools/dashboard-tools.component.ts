import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from "@angular/material";

import { WorkspaceConfigService } from '../../workspace-config/workspace-config.service';
import { DrawService } from '../../draw/draw.service';
import {UUID} from "angular2-uuid";

@Component({
    selector: 'dashboard-tools',
    templateUrl: 'dashboard-tools.component.html',
    styleUrls: ['dashboard-tools.component.css']
})
export class DashboardToolsComponent implements OnInit {

    private draws: Array<any> = [];

    constructor(public workspaceConfigService:WorkspaceConfigService,
                private drawService: DrawService,
                private snackBar: MdSnackBar) { }

    ngOnInit() {
        this.workspaceConfigService.loadConfigurations();
        this.getDraws();
    }

    public addDraw(name: string): void {
        this.workspaceConfigService.currentConfig.boxes.push({
            id: UUID.UUID(),
            config: { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'sizex': 1, 'sizey': 1 },
            svg: name,
        });
    }

    public removeGridItem(IdGridItem: UUID): void {
        this.workspaceConfigService.removeBox(IdGridItem);
    }

    private getDraws(): void{
        this.drawService.getDraws()
            .subscribe(
                data => this.draws = data,
                err => this.snackBar.open("Can't retrieve the draws", 'Undo', { duration: 3000 }));
    }
}
