import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Features } from './models/features.model';
import { BehaviorSubject, Observable, Subject, from, map, of, tap } from 'rxjs';
import { Color } from '../info/models/color.model';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  public featrues: Features = new Features();
  size: number[] = [];
  allSize: number[] = [];
  rateValues: Array<boolean> = [false, false, false, false, false];
  public colors: Color[] = [];



  constructor(public prodService: ProductsService) { }


  ngOnInit(): void {

    this.prodService.featrues.subscribe(r => {
      this.featrues = r;
      this.allSize = Array.from({ length: r.size.slice(-1)[0] - r.size[0] + 1 }, (_, i) => i + r.size[0]);
      this.size = r.size;
      this.rate(Math.floor(r.rate))
    })
  }
  rate(rate: number) {
    this.rateValues = this.rateValues.map((r, i) => { return (i >= rate) ? r = true : r = false; })
  }

  changeColor(color: string) {
    this.prodService.getColor(color);
  }

}
