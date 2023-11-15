import { Component, OnInit } from '@angular/core';
import { ProductsService } from './shared/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sarmady';
  constructor(private prodService : ProductsService){}
  ngOnInit(): void {
    this.prodService.getDate().subscribe(r => console.log(r))
  }
}
