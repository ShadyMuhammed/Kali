import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { map } from 'rxjs/operators';
import { Info } from './info/models/info.model';
import { Product } from '../shared/models/product.model';
import { Observable, Subject, from, of } from 'rxjs';
import { Features } from './features/models/features.model';
import { SafePipe } from '../shared/pipes/safe.pipe';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  constructor(private prodService: ProductsService, public safe: SafePipe) { }
  info = new Subject<Info>
  info$: Observable<Info> = new Observable<Info>
  feature = new Subject<Features>;
  isFirstLoad: boolean = true;
  selected: number = 0;
  videoLink: string = "";
  showVideo: boolean = false;
  ngOnInit(): void {

    this.prodService.getData()
      .subscribe(r => {
        console.log(r);
        this.prodService.savedData = r;
        this.isFirstLoad ? this.selected = r[0].id : this.selected = this.prodService.selectedItem;
        this.isFirstLoad = false;
        this.passData(r.find(x => x.id === this.selected) as Product);
        this.prodService.activeId.next(r[0].id);
        this.videoLink = this.prodService.getItem(this.selected)?.video?.replace("watch?v=", "embed/") as string;
        this.prodService.data.next(r)
      })

    this.prodService.showVideo.subscribe(r => {
      this.showVideo = r;
    })
    this.prodService.videoLink.subscribe(r => {
      this.videoLink = r.replace("watch?v=", "embed/");
    }
    )
  }
  passData(prod: Product) {
    this.prodService.info.next(prod);
    this.prodService.featrues.next(prod as Features);
  }
}
