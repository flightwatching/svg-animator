import { Component, OnInit } from '@angular/core';
import { WorkspaceConfigService } from '../workspace-config/workspace-config.service';
import { DrawModel } from '../draw/draw.model'
import {DrawService} from "../draw/draw.service";
import {UUID} from "angular2-uuid";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    private draws: Array<DrawModel> = [];

    constructor(public workspaceConfigService:WorkspaceConfigService,
                private drawService: DrawService) {

    }

    ngOnInit() {
        this.workspaceConfigService.loadConfigurations();
        this.getDraws();
    }

    getDraws(): void {
        this.drawService.getDraws()
            .subscribe(
                data => this.draws = data,
                err => console.error("dzada"))
    }

    removeGridItem(IdGridItem: UUID) {
        this.workspaceConfigService.removeBox(IdGridItem);
    }
}
