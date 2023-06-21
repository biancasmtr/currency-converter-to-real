import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadComponent } from './cad.component';

describe('CadComponent', () => {
  let component: CadComponent;
  let fixture: ComponentFixture<CadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadComponent]
    });
    fixture = TestBed.createComponent(CadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
