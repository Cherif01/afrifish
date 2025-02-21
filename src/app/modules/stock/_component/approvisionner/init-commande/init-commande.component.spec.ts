import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitCommandeComponent } from './init-commande.component';

describe('InitCommandeComponent', () => {
  let component: InitCommandeComponent;
  let fixture: ComponentFixture<InitCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
