import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureProformatComponent } from './facture-proformat.component';

describe('FactureProformatComponent', () => {
  let component: FactureProformatComponent;
  let fixture: ComponentFixture<FactureProformatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureProformatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureProformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
