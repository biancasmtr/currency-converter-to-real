import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsComponent } from './ars.component';

describe('ArsComponent', () => {
  let component: ArsComponent;
  let fixture: ComponentFixture<ArsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArsComponent]
    });
    fixture = TestBed.createComponent(ArsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
