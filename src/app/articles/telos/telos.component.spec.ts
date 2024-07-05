import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelosComponent } from './telos.component';

describe('TelosComponent', () => {
  let component: TelosComponent;
  let fixture: ComponentFixture<TelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
