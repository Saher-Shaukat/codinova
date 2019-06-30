import { Component, OnInit, AfterContentChecked } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { Product } from "src/app/_model/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.container.html",
  styleUrls: ["./products.container.css"]
})

/**
 * @author Saher Shaukat
 * @description Container to make API calls and display Product List
 */
export class ProductsContainer implements OnInit, AfterContentChecked {
  // Global Variables
  productsList: Product[] = [];
  cartProducts: Product[] = [];
  vatPercent = 0;
  discountPercent = 0;
  VAT = 0.0;
  discount = 0.0;
  total = 0.0;
  showPopup = false;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  /**
   * @description GET All Products
   */
  getAllProducts() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.productsList = res;
    });
  }

  /**
   * @description Add Clicked Items to Cart
   * @param product Current added product details
   */
  onAddToCart(product) {
    let found = 0;

    // if item not added before, quatity=1
    product.quantity = !product.quantity ? 1 : product.quantity + 1;
    for (let index = 0; index < this.cartProducts.length; index++) {
      if (this.cartProducts[index].id == product.id) {
        this.cartProducts[index] = product;
        found = 1;
        break;
      }
    }
    if (!found) {
      this.cartProducts.push(product);
    }
  }

  /**
   * @description Decrease quantity for added products
   * @param product Current product details
   * @param index Current product index
   */
  decrementQuantity(index) {
    this.cartProducts[index].quantity--;

    //remove from cart if quantity becomes '0'
    if (this.cartProducts[index].quantity == 0) {
      this.removeProduct(index);
    }
  }

  /**
   * @description Increase quantity for added products
   * @param product Current product details
   */
  incrementQuantity(index) {
    this.cartProducts[index].quantity++;
  }

  /**
   * @description Remove cart items
   * @param index ProductToRemove index
   */
  removeProduct(index) {
    this.cartProducts.splice(index, 1);
  }

  /**
   * @description Clear Cart, VAT and Discount details
   */
  cancelSale() {
    this.cartProducts = [];
    this.vatPercent = 0;
    this.discountPercent = 0;
  }

  /**
   * @description Close Popup
   */
  showHideModal(event) {
    this.showPopup = event;
    if(!event) {
      this.cancelSale();
    }
  }

  /**
   * @description Calculate total, VAT and Discount on change
   */
  ngAfterContentChecked() {
    this.total = this.cartProducts.reduce(
      (runningValue: number, product: Product) => {
        return runningValue + +product.price * product.quantity;
      },
      0
    );
    this.VAT = (this.vatPercent / 100) * this.total;
    this.discount = (this.discountPercent / 100) * this.total;
  }
}
