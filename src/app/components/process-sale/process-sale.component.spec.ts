import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProcessSaleComponent } from "./process-sale.component";

describe("ProcessSaleComponent", () => {
  let component: ProcessSaleComponent;
  let fixture: ComponentFixture<ProcessSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessSaleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit showModal false event on cancel", () => {
    // spy on event emitter
    spyOn(component.showModal, "emit");

    component.closePopup();

    expect(component.showModal.emit).toHaveBeenCalledWith(false);
  });

  it("should calculate total quantity", () => {
    component.cartItems = [
      {
        id: 1,
        name: "comuter",
        price: "130",
        quantity: 2,
        category: "computers",
        description: "",
        image: "computer.jpg"
      },
      {
        id: 2,
        name: "sweater",
        price: "1",
        category: "Clothing",
        description: "fashion, clothes , sweater, wool, cardigan,…",
        quantity: 3
      },
      {
        id: 3,
        name: "tie",
        price: "46",
        category: "Clothing",
        description: "fashion, tie, clothes, accessory , accessoire,…",
        image: "tie.jpeg",
        quantity: 2
      }
    ];

    expect(component.calculateTotalQuantity()).toBe(7);
  });

  it("should call and set total Quantity", () => {
    spyOn(component, "calculateTotalQuantity");

    component.ngOnInit();
    expect(component.calculateTotalQuantity).toHaveBeenCalledTimes(1);
  });
});
