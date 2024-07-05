import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelosCercanosComponent } from './telos-cercanos.component';

describe('TelosCercanosComponent', () => {
  let component: TelosCercanosComponent;
  let fixture: ComponentFixture<TelosCercanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelosCercanosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelosCercanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
