import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessSaleComponent } from './components/process-sale/process-sale.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsContainer } from './containers/products/products.container';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './constants/config';
import { responseProvider } from './_interceptors/response.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProcessSaleComponent,
    ProductDetailsComponent,
    ProductsContainer,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Configuration, responseProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
