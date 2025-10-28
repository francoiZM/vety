import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculoDosisPage } from './calculo-dosis.page';

describe('CalculoDosisPage', () => {
  let component: CalculoDosisPage;
  let fixture: ComponentFixture<CalculoDosisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoDosisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
