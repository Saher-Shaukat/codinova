import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductDetailsComponent } from "./product-details.component";

describe("ProductDetailsComponent", () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit decrement event on decrement", () => {
    // spy on event emitter
    spyOn(component.decreaseQty, "emit");

    component.decrementQuantity(0);

    expect(component.decreaseQty.emit).toHaveBeenCalledWith(0);
  });

  it("should emit increment event on increment", () => {
    // spy on event emitter
    spyOn(component.increaseQty, "emit");

    component.incrementQuantity(0);

    expect(component.increaseQty.emit).toHaveBeenCalledWith(0);
  });

  it("should emit remove event on remove from cart", () => {
    // spy on event emitter
    spyOn(component.deleteProduct, "emit");

    component.removeProduct(0);

    expect(component.deleteProduct.emit).toHaveBeenCalledWith(0);
  });
});
