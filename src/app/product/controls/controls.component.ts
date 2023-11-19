import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Features } from '../features/models/features.model';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit{
  constructor(private prodService : ProductsService){}
  dataList : Product[] = [];
  activeId: number = 0;
  
  ngOnInit(): void {
    this.prodService.data.subscribe(r =>{
      this.dataList = this.prodService.savedData;
      
    })
    this.prodService.activeId.subscribe(r =>{ this.activeId = r;})
  }
  toggleVew(){
    this.prodService.showVideo.next(true);
  }
  navigateItems(isNext? : boolean){
    let ids = this.dataList.map( r => r.id);
    let current = ids.indexOf(this.activeId);
    
    if (isNext) {
      let next : number;
    current+1 == ids.length ? next = 0 : next = current+1;
      this.activeId = ids[next];
    this.prodService.selectedItem = ids[next];
    this.prodService.info.next(this.prodService.getItem(ids[next]) as Product)
    this.prodService.featrues.next(this.prodService.getItem(ids[next]) as Features)
    
    } else {
      let prev : number;
      current == 0 ? prev = ids.length - 1 : prev = current-1;
      this.activeId = ids[prev];
    this.prodService.selectedItem = ids[prev];
    this.prodService.info.next(this.prodService.getItem(ids[prev]) as Product)
    this.prodService.featrues.next(this.prodService.getItem(ids[prev]) as Features)
    
    }
    
  }
jumbTo(item : Product){
  this.activeId = item.id;
  this.prodService.selectedItem = item.id;
  this.prodService.info.next(this.prodService.getItem(item.id) as Product)
  this.prodService.featrues.next(this.prodService.getItem(item.id) as Features)
  
}

}
