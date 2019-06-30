import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Product } from "src/app/_model/product";

@Component({
  selector: "app-process-sale",
  templateUrl: "./process-sale.component.html",
  styleUrls: ["./process-sale.component.css"]
})
export class ProcessSaleComponent implements OnInit {
  @Input() cartItems: Product[] = [];
  @Input() vat = 0;
  @Input() discount = 0;
  @Input() total = 0;
  @Output() showModal = new EventEmitter<boolean>();
  now = new Date();
  totalQuantity = 0;

  constructor() {}

  ngOnInit() {
    this.totalQuantity = this.calculateTotalQuantity();
  }

  /**
   * @description emit event to parent on close
   */
  closePopup() {
    this.showModal.emit(false);
  }

  calculateTotalQuantity() {
    return this.cartItems.reduce((acc, cartItem: Product) => {
      return acc + cartItem.quantity;
    }, 0);
  }
}
