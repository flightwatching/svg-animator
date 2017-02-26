import { NgGridItemConfig } from "angular2-grid";
import {UUID} from "angular2-uuid";

export class Box {
	id: UUID;
	config: NgGridItemConfig;
	svg: string;
}