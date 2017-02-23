import { NgGridConfig } from "angular2-grid";
import { Box } from "../box.model";

export class WorkspaceConfigModel {
    name: String;
    gridConfig: NgGridConfig;
    boxes: Array<Box>;
}