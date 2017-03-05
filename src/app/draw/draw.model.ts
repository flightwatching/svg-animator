/**
 * Draw Model
 */
import { ScriptModel } from "./script.model";

export class DrawModel {
    name: String;
    svg: String;
    scripts: Array<ScriptModel>;

    constructor(draw: {name: String, svg: String, scripts: Array<ScriptModel>}) {
        this.name = draw.name;
        this.svg = draw.svg;
        this.scripts = draw.scripts;
    }
}