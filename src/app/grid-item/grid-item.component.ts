import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {DrawService} from "../draw/draw.service";
import {DrawModel} from "../draw/draw.model";
import {MdSnackBar} from "@angular/material";
import {UUID} from "angular2-uuid";
import {Box} from "../box.model";
import * as d3 from 'd3';

@Component({
  selector: 'grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.css']
})
export class GridItemComponent implements OnInit, AfterViewInit {

  @Input() itemConfigs: Box;

  @Output() remove: EventEmitter<UUID> = new EventEmitter<UUID>();

  draw: DrawModel;

  constructor(private drawService:DrawService, private snackBar: MdSnackBar) {
      this.draw = new DrawModel({name: "empty", svg: "empty", scripts: []});
  }

  ngOnInit() {
      this.drawService.getDraw(this.itemConfigs.svg)
        .subscribe(
            data => {
                if(data) {
                    this.draw = new DrawModel(data);
                }
            },
            err => this.snackBar.open(`Cannot retrieve ${this.itemConfigs.svg}`, 'Undo', { duration: 3000 }));
  }

  removeItem(): void {
      this.remove.emit(this.itemConfigs.id);
  }


    ngAfterViewInit() {
        this.draw.scripts.map(s => eval(s.script));
    }
}
