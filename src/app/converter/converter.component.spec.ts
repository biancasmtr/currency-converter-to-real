import { CadComponent } from './../cad/cad.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConverterComponent } from './converter.component';
import { ArsComponent } from '../ars/ars.component';
import { GbpComponent } from '../gbp/gbp.component';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterComponent, ArsComponent, GbpComponent, CadComponent],
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('criar o component', () => {
    expect(component).toBeTruthy();
  });
});
