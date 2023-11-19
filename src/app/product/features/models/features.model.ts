import { Color } from "../../info/models/color.model";

export class Features{
    id?:number;
    size: number[] = [];
    price?: string;
    colors:Color[] = [];
    rate:number = 0;
    // availColors : string[] = this.colors.map(r => r.name)

}