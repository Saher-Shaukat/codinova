import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "src/app/_model/product";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  @Input() cartItems: Product[] = [];

  @Output() decreaseQty = new EventEmitter<{}>();
  @Output() increaseQty = new EventEmitter<number>();
  @Output() deleteProduct = new EventEmitter<{}>();

  constructor() {}

  ngOnInit() {}

  decrementQuantity(index, product) {
    this.decreaseQty.emit({ index: index, product: product });
  }

  incrementQuantity(index) {
    this.increaseQty.emit(index);
  }

  removeProduct(index, product) {
    this.deleteProduct.emit({ index: index, product: product });
  }
}
