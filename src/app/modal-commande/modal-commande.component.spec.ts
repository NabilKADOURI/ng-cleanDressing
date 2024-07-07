import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCommandeComponent } from './modal-commande.component';

describe('ModalCommandeComponent', () => {
  let component: ModalCommandeComponent;
  let fixture: ComponentFixture<ModalCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
