import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Info } from './models/info.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Color } from './models/color.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  selected: string = '';
  public info: Info = new Info();
  public images: string[] = [];
  public imgSrc: string = ""
  constructor(public prodService: ProductsService) { }
  ngOnInit(): void {

    this.prodService.info.subscribe(r => {
      this.info = r;
      this.selected = r.colors[0].name;
      this.prodService.getColor(this.selected);


    })
    this.prodService.images.subscribe(r => {
      this.images = r.map(i => i = "../../../assets/" + i);
      this.imgSrc = this.images[0]
      this.imgSrc ? this.prodService.currentImage.next(`../../../assets/${this.imgSrc}`) : ""
    })


  }
  changeImage(src: string) {
    this.prodService.currentImage.next(`../../../assets/${src}`)
    this.imgSrc = `${src}`
  }
}
