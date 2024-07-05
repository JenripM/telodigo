import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFuncionaComponent } from './nav-funciona.component';

describe('NavFuncionaComponent', () => {
  let component: NavFuncionaComponent;
  let fixture: ComponentFixture<NavFuncionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavFuncionaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavFuncionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
