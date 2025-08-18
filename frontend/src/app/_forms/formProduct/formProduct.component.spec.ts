import { ComponentFixture, TestBed } from '@angular/core/testing';

import { formProduct } from './formProduct.component';

describe('formProduct', () => {
  let component: formProduct;
  let fixture: ComponentFixture<formProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [formProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(formProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
