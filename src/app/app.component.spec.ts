import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { ArsComponent } from './ars/ars.component';
import { GbpComponent } from './gbp/gbp.component';
import { CadComponent } from './cad/cad.component';


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      declarations: [AppComponent, ConverterComponent, ArsComponent, GbpComponent, CadComponent]
    });
  });

  it('Criar o aplicativo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Ter como título 'conversor de moeda'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('currency-converter');
  });
});
