import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFournisseurComponent } from './details-fournisseur.component';

describe('DetailsFournisseurComponent', () => {
  let component: DetailsFournisseurComponent;
  let fixture: ComponentFixture<DetailsFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
