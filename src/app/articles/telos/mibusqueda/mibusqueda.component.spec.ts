import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MibusquedaComponent } from './mibusqueda.component';

describe('MibusquedaComponent', () => {
  let component: MibusquedaComponent;
  let fixture: ComponentFixture<MibusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MibusquedaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MibusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
