import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVenteComponent } from './client-vente.component';

describe('ClientVenteComponent', () => {
  let component: ClientVenteComponent;
  let fixture: ComponentFixture<ClientVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
