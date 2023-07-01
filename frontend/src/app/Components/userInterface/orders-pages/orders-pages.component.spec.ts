import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPagesComponent } from './orders-pages.component';

describe('OrdersPagesComponent', () => {
  let component: OrdersPagesComponent;
  let fixture: ComponentFixture<OrdersPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
