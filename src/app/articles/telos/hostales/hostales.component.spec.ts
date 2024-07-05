import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostalesComponent } from './hostales.component';

describe('HostalesComponent', () => {
  let component: HostalesComponent;
  let fixture: ComponentFixture<HostalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
