import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Product } from '../models/product.model';
import { Info } from 'src/app/product/info/models/info.model';
import { Features } from 'src/app/product/features/models/features.model';
import { Color } from 'src/app/product/info/models/color.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  info = new Subject<Info>();
  featrues = new Subject<Features>();
  info$ = this.info.asObservable();
  features$ = this.featrues.asObservable();
  savedData: Product[] = [];
  data = new BehaviorSubject<Product[]>([])
  color = new Subject<Color>;
  images = new BehaviorSubject<string[]>([])
  selectedItem: number = 0;
  currentImage = new BehaviorSubject<string>("");
  showVideo = new BehaviorSubject<boolean>(false);
  videoLink = new BehaviorSubject<string>("")
  activeId = new BehaviorSubject<number>(0)
  
  constructor(private http: HttpClient) { }

  public getData(): Observable<Product[]> {
    
    return this.http.get<Product[]>(`../../assets/data/data.json`)
      .pipe(map(r => r))
  }
  public getItem(id: number) {
  this.videoLink.next(this.savedData.find(i => i.id === id)?.video as string)
    return this.savedData.find(i => i.id === id);
  }
  public getColor(colorName: string): void {
    let x: string[] = [];
    if (this.selectedItem !== 0) {
      x = this.savedData.find(i => i.id == this.selectedItem)?.colors.find(c => c.name === colorName)?.images as string[];
    } else {
      x = this.savedData[0].colors.find(c => c.name === colorName)?.images as string[];
    }
    this.images.next(x);
  }

}
