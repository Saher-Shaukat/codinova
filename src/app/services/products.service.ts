import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Configuration } from 'src/app/constants/config';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private api: ApiService,
    private API_URL: Configuration
  ) { }


  getProducts() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_PRODUCTS}`);
  }
}
