import {Component, OnInit, Input} from '@angular/core';
import {NgGridItemConfig} from "angular2-grid";
import {DrawService} from "../draw/draw.service";

@Component({
  selector: 'grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.css']
})
export class GridItemComponent implements OnInit {

  @Input() itemConfigs:any;

  private svg: String = "";

  constructor(private drawService:DrawService) {}

  ngOnInit() {
    this.drawService.getDraw(this.itemConfigs.svg)
        .subscribe(
            data => {
                if(data) {
                    this.svg = data.svg
                }
            },
            err => console.error(err.message)
        )
  }
}
