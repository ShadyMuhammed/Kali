import { Color } from "./color.model";

export class Info {
    constructor(private selected?: string) {}
    id: number = 0;
    category?: string;
    description?: string;
    colors:Color[] = [];
    title?: string;
    images?: string[] = this.colors.find( r => r.name === this.selected)?.images
    video?:string
    
    }

