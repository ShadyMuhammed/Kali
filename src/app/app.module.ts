import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { InfoComponent } from './product/info/info.component';
import { FeaturesComponent } from './product/features/features.component';
import { ControlsComponent } from './product/controls/controls.component';
import { SliderComponent } from './product/slider/slider.component';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    InfoComponent,
    FeaturesComponent,
    ControlsComponent,
    SliderComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
