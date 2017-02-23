import {Component, OnInit, Input} from '@angular/core';
import {DrawService} from "../draw/draw.service";
import {DrawModel} from "../draw/draw.model";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.css']
})
export class GridItemComponent implements OnInit {

  @Input() itemConfigs:any;

  draw: DrawModel;

  constructor(private drawService:DrawService, private snackBar: MdSnackBar) {
      this.draw = new DrawModel({name: "empty", svg: "empty"});
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
}
