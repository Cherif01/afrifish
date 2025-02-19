import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccesComponent } from './list-acces.component';

describe('ListAccesComponent', () => {
  let component: ListAccesComponent;
  let fixture: ComponentFixture<ListAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
