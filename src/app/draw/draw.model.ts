/**
 * Draw Model
 */

export class DrawModel {
    name: String;
    svg: String;

    constructor(draw: {name: String, svg: String}) {
        this.name = draw.name;
        this.svg = draw.svg;
    }
}
