import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductsContainer } from "./products.container";
import { of } from "rxjs";
import * as products from "src/assets/_mock-data/products.json";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Configuration } from "src/app/constants/config";
import { RouterTestingModule } from "@angular/router/testing";
import { ProductDetailsComponent } from "src/app/components/product-details/product-details.component";
import { ProcessSaleComponent } from "src/app/components/process-sale/process-sale.component";
import { responseProvider } from "src/app/_interceptors/response.interceptor";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { Product } from "src/app/_model/product";

describe("ProductsContainer", () => {
  let component: ProductsContainer;
  let fixture: ComponentFixture<ProductsContainer>;
  let productService;
  let submitEl: DebugElement;
  let popup: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [
        ProductsContainer,
        ProductDetailsComponent,
        ProcessSaleComponent
      ],
      providers: [Configuration, responseProvider]
    }).compileComponents();
  }));

  beforeEach(() => {
    productService = {
      getProducts: () => {
        return of(products);
      }
    };
    fixture = TestBed.createComponent(ProductsContainer);
    component = fixture.componentInstance;
    submitEl = fixture.debugElement.query(By.css(".proceed"));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render title in a h1 tag", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain("Main Screen");
  });

  it("No Item in cart disables the Process Sale button", () => {
    component.cartProducts = [];
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  /**
   * Test case for ngOnInit() Function
   */
  it("should get all products oninit", () => {
    spyOn(component, "getAllProducts");
    component.ngOnInit();
    expect(component.getAllProducts).toHaveBeenCalledTimes(1);
  });

  /**
   * Test case for getAllProducts() Function
   */
  it("should call getProducts and return list of products", async(() => {
    spyOn(productService, "getProducts").and.returnValue(of([]));

    component.getAllProducts();

    fixture.detectChanges();

    expect(component.productsList).toEqual([]);
  }));

  /**
   * Test case for onAddToCart() Function
   * */
  it("When product is clicked, then it is added to cart", () => {
    const firstProduct = {
      id: 1,
      name: products[0].name,
      price: products[0].price,
      description: "Woollen"
    };

    component.onAddToCart(firstProduct);

    expect(component.cartProducts[0].quantity).toEqual(1);
  });

  it("When product is clicked and it is already in cart, then only quantity increase by 1", () => {
    const firstProduct = {
      id: 1,
      name: products[1].name,
      price: products[1].price,
      description: products[1].description,
      quantity: 1,
      category: products[1].category
    };
    component.cartProducts = [
      {
        id: 2,
        name: products[1].name,
        price: products[1].price,
        description: products[1].description,
        quantity: 1,
        category: products[1].category
      },
      {
        id: 1,
        name: products[0].name,
        price: products[0].price,
        description: products[0].description,
        quantity: 1,
        category: products[0].category
      }
    ];
    component.onAddToCart(firstProduct);
    fixture.detectChanges();
    expect(component.cartProducts.length).toEqual(2);
    expect(component.cartProducts[1].quantity).toEqual(2);
  });

  /**
   * Test case for decrementQuantity() Function
   * */

  it("should delete item if quantity <=0 else decrement quantity by 1", () => {
    component.cartProducts = [
      {
        id: 2,
        name: products[1].name,
        price: products[1].price,
        description: products[1].description,
        quantity: 2,
        category: products[1].category
      },
      {
        id: 1,
        name: products[0].name,
        price: products[0].price,
        description: products[0].description,
        quantity: 1,
        category: products[0].category
      }
    ];

    // quantity decreases by 1 if quantity greater than 0
    component.decrementQuantity({
      index: 0,
      product: component.cartProducts[0]
    });
    fixture.detectChanges();
    expect(component.cartProducts.length).toEqual(2);
    expect(component.cartProducts[0].quantity).toEqual(1);

    // remove product from cart if quantity = 0
    component.decrementQuantity({
      index: 1,
      product: component.cartProducts[1]
    });
    fixture.detectChanges();
    expect(component.cartProducts.length).toEqual(1);
    expect(component.cartProducts[1]).toBeUndefined();
  });

  /**
   * Test case for incrementQuantity() Function
   * */

  it("should increment quantity by 1", () => {
    component.cartProducts = [
      {
        id: 2,
        name: products[1].name,
        price: products[1].price,
        description: products[1].description,
        quantity: 2,
        category: products[1].category
      },
      {
        id: 1,
        name: products[0].name,
        price: products[0].price,
        description: products[0].description,
        quantity: 1,
        category: products[0].category
      }
    ];

    component.incrementQuantity(0);
    fixture.detectChanges();
    expect(component.cartProducts.length).toEqual(2);
    expect(component.cartProducts[0].quantity).toEqual(3);
  });

  /**
   * Test case for showHideModal() Function
   */

  it("calling showHideModal with true makes popup visible", () => {
    component.showHideModal(true);
    fixture.detectChanges();
    popup = fixture.debugElement.query(By.css(".popup"));
    expect(popup.nativeElement.hasAttribute("hidden")).toBe(false);
    expect(component.showPopup).toBe(true);
  });

  it("calling showHideModal with false hides popup", () => {
    component.showHideModal(false);
    fixture.detectChanges();
    popup = fixture.debugElement.query(By.css(".popup"));
    expect(popup).toBeDefined(false);
    expect(component.showPopup).toBe(false);
  });

  /**
   * Test case for removeProduct() Function
   */
  it("click on cross button should remove item from cart", () => {
    const productToRemove = {
      id: 1,
      name: products[1].name,
      price: products[1].price,
      description: products[1].description,
      quantity: 1,
      category: products[1].category
    };

    component.cartProducts = [
      {
        id: 2,
        name: products[1].name,
        price: products[1].price,
        description: products[1].description,
        quantity: 1,
        category: products[1].category
      },
      {
        id: 1,
        name: products[0].name,
        price: products[0].price,
        description: products[0].description,
        quantity: 2,
        category: products[0].category
      },
      {
        id: 3,
        name: products[2].name,
        price: products[2].price,
        description: products[2].description,
        quantity: 5,
        category: products[2].category
      }
    ];
    component.removeProduct({ index: 1, product: productToRemove });
    fixture.detectChanges();
    expect(component.cartProducts.length).toEqual(2);
    expect(component.cartProducts[1].id).toEqual(3);
  });
});
