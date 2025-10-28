import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioMPage } from './inventario-m.page';

describe('InventarioMPage', () => {
  let component: InventarioMPage;
  let fixture: ComponentFixture<InventarioMPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioMPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
