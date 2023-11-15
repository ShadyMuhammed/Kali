import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  
  public getDate(): Observable<Product[]> {
    return this.http.get<Product[]>(`../../assets/data/data.json`)
    .pipe(map(r => r))
  }
}
