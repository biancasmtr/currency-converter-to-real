import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberFormatComponent } from './number-format.component';

describe('NumberFormatComponent', () => {
  let component: NumberFormatComponent;
  let fixture: ComponentFixture<NumberFormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberFormatComponent]
    });
    fixture = TestBed.createComponent(NumberFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
