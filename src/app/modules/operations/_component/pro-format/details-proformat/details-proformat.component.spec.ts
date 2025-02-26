import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProformatComponent } from './details-proformat.component';

describe('DetailsProformatComponent', () => {
  let component: DetailsProformatComponent;
  let fixture: ComponentFixture<DetailsProformatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsProformatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
