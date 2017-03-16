import { Component, OnInit } from '@angular/core';
import { WorkspaceConfigService } from '../workspace-config/workspace-config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public workspaceConfigService:WorkspaceConfigService) { }

  ngOnInit() {
  }

}
