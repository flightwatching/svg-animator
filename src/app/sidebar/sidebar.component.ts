import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	private sidenavOpened = false;

	constructor(public location: Location) {}

	ngOnInit() {}

	sideNav():void {
		this.sidenavOpened = !this.sidenavOpened;
	}
}
