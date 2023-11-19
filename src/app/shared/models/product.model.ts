import { Color } from "./color.model";

export interface Product {
    id: number;
    title?: string;
    description?: string;
    category?: string;
    video?: string;
    price?: number;
    rate?: number;
    size?: number[];
    images?: [];
    colors : Color[];

}