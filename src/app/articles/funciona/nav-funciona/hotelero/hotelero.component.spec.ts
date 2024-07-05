import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteleroComponent } from './hotelero.component';

describe('HoteleroComponent', () => {
  let component: HoteleroComponent;
  let fixture: ComponentFixture<HoteleroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoteleroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoteleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
