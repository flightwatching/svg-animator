/**
 * Draw Model
 */

export class DrawModel {
    name: String;
    svg: String;
    scripts: Array<String>;

    constructor(draw: {name: String, svg: String, scripts: Array<String>}) {
        this.name = draw.name;
        this.svg = draw.svg;
        this.scripts = draw.scripts;
    }
}