import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurApprovisionnerComponent } from './fournisseur-approvisionner.component';

describe('FournisseurApprovisionnerComponent', () => {
  let component: FournisseurApprovisionnerComponent;
  let fixture: ComponentFixture<FournisseurApprovisionnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurApprovisionnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseurApprovisionnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
