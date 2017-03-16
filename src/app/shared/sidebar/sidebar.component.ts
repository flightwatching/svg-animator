import { Component, OnInit } from '@angular/core';
import { WorkspaceConfigService } from '../../workspace-config/workspace-config.service';
import {MdSnackBar} from '@angular/material';
import {DrawService} from "../../draw/draw.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	private sidenavOpened = false;

	constructor(public workspaceConfigService:WorkspaceConfigService,
				private snackBar: MdSnackBar,
				private drawService: DrawService) { }

	ngOnInit() {}

	sideNav():void {
		this.sidenavOpened = !this.sidenavOpened;
	}
}
