import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "src/app/_model/product";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  @Input() cartItems: Product[] = [];

  @Output() decreaseQty = new EventEmitter<number>();
  @Output() increaseQty = new EventEmitter<number>();
  @Output() deleteProduct = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  decrementQuantity(index) {
    this.decreaseQty.emit(index);
  }

  incrementQuantity(index) {
    this.increaseQty.emit(index);
  }

  removeProduct(index){
    this.deleteProduct.emit(index);
  }
}
