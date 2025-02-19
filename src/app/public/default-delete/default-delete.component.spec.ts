import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultDeleteComponent } from './default-delete.component';

describe('DefaultDeleteComponent', () => {
  let component: DefaultDeleteComponent;
  let fixture: ComponentFixture<DefaultDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
