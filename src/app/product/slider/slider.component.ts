import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Features } from '../features/models/features.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  src: string = '';
  tranform: number = 0
  private swipeCoord: [number, number] = [0, 0];
  private swipeTime: number = 0;
  dataList: Product[] = [];
  activeId: number = 0;

  constructor(private prodService: ProductsService) { }
  ngOnInit(): void {
    this.prodService.currentImage.subscribe(r => this.src = r);
    this.prodService.data.subscribe(r => this.dataList = r)
    this.prodService.activeId.subscribe(r => this.activeId = r)

  }

  drag(e: DragEvent, when: string) {

    this.tranform = e.offsetX / 20;
    let x = e.offsetX;
    if (when === "end") {
      this.tranform = 0;
      if (x > 250) {
        this.next();
      }
      if (x < 150) {
        this.prev()
      }
    }

  }
  swipe(e: TouchEvent, when: string): void {
    console.log(e.changedTouches[0].pageX)
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    const time = new Date().getTime();
    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    }
    else if (when === 'end') {
      this.tranform = 0;
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (duration < 1000
        && Math.abs(direction[0]) > 30
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {

        if (direction[0] < 0) {
          this.next();

        } else {
          this.prev();
        }
      }
    }
  }


  next() {
    let ids = this.dataList.map(r => r.id);
    let current = ids.indexOf(this.activeId);
    let next: number;
    current + 1 == ids.length ? next = 0 : next = current + 1;
    this.activeId = ids[next];
    this.prodService.selectedItem = ids[next];
    this.prodService.activeId.next(ids[next]);
    this.prodService.info.next(this.prodService.getItem(ids[next]) as Product)
    this.prodService.featrues.next(this.prodService.getItem(ids[next]) as Features)

  }
  prev() {
    let ids = this.dataList.map(r => r.id);
    let current = ids.indexOf(this.activeId);
    let prev: number;
    current == 0 ? prev = ids.length - 1 : prev = current - 1;
    this.activeId = ids[prev];
    this.prodService.selectedItem = ids[prev];
    this.prodService.activeId.next(ids[prev]);
    this.prodService.info.next(this.prodService.getItem(ids[prev]) as Product)
    this.prodService.featrues.next(this.prodService.getItem(ids[prev]) as Features)

  }

}
