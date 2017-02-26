import { Box } from "../box.model";

export class WorkspaceConfigModel {
    name: String;
    boxes: Array<Box>;

    constructor(name: String) {
        this.name = name;
        this.boxes = [];
    }
}