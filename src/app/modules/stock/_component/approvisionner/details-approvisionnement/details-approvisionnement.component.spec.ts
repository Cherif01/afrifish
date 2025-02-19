import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsApprovisionnementComponent } from './details-approvisionnement.component';

describe('DetailsApprovisionnementComponent', () => {
  let component: DetailsApprovisionnementComponent;
  let fixture: ComponentFixture<DetailsApprovisionnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsApprovisionnementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsApprovisionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
