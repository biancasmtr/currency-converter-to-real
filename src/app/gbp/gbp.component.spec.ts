import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbpComponent } from './gbp.component';

describe('GbpComponent', () => {
  let component: GbpComponent;
  let fixture: ComponentFixture<GbpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GbpComponent]
    });
    fixture = TestBed.createComponent(GbpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
