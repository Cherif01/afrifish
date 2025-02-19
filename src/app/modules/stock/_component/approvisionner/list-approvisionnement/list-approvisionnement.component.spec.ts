import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApprovisionnementComponent } from './list-approvisionnement.component';

describe('ListApprovisionnementComponent', () => {
  let component: ListApprovisionnementComponent;
  let fixture: ComponentFixture<ListApprovisionnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListApprovisionnementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListApprovisionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
