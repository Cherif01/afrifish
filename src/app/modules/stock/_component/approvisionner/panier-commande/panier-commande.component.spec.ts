import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierCommandeComponent } from './panier-commande.component';

describe('PanierCommandeComponent', () => {
  let component: PanierCommandeComponent;
  let fixture: ComponentFixture<PanierCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
