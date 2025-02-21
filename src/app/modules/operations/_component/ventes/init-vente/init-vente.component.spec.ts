import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitVenteComponent } from './init-vente.component';

describe('InitVenteComponent', () => {
  let component: InitVenteComponent;
  let fixture: ComponentFixture<InitVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
