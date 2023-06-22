import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { CadComponent } from './cad.component';

describe('CadComponent', () => {
  let component: CadComponent;
  let fixture: ComponentFixture<CadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadComponent],
      imports: [HttpClientTestingModule, HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Criar o component', () => {
    expect(component).toBeTruthy();
  });

  it('Buscar dados de moeda na inicialização', () => {
    spyOn(component, 'fetchCurrencyDataCad');
    component.ngOnInit();
    expect(component.fetchCurrencyDataCad).toHaveBeenCalled();
  });

  it('Atualizar os valores da moeda do cache, se disponível', () => {
    const cacheData = {
      timestamp: new Date().getTime(),
      data: {
        cadValue: 5,
        cadVariation: 0.5,
        cadLastUpdate: new Date()
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cacheData));
    spyOn(component, 'fetchCurrencyDataCad');
    component.updateCurrencyValues();
    expect(component.cadValue).toBe(5);
    expect(component.cadVariation).toBe(0.5);
    expect(component.cadLastUpdate).toEqual(new Date(cacheData.data.cadLastUpdate));
    expect(component.fetchCurrencyDataCad).not.toHaveBeenCalled();
  });

  it('Buscar dados de moeda se o cache estiver expirado', () => {
    const cacheData = {
      timestamp: new Date().getTime() - 200000,
      data: {
        cadValue: 5,
        cadVariation: 0.5,
        cadLastUpdate: new Date()
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cacheData));
    spyOn(component, 'fetchCurrencyDataCad');
    component.updateCurrencyValues();
    expect(component.fetchCurrencyDataCad).toHaveBeenCalled();
  });

  it('Definir a cor da moeda com base no valor', () => {
    expect(component.getCurrencyColor(0.5)).toBe('#dd4b4b');
    expect(component.getCurrencyColor(3)).toBe('#3c7649');
    expect(component.getCurrencyColor(8)).toBe('#3684cb');
  });

  it('Converter para moeda se brlValue for válido', () => {
    component.brlValue = 2;
    component.cadValue = 10;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(false);
    expect(component.cadValue).toBe(20);
  });

  it('Mostrar mensagem de conversão fixa se brlValue for 1', () => {
    component.brlValue = 1;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(true);
  });

  it('Não deve converter para moeda se brlValue for nulo', () => {
    component.brlValue = null;
    component.cadValue = 10;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(false);
    expect(component.cadValue).toBe(10);
  });

  it('Não deve converter para moeda se brlValue for NaN', () => {
    component.brlValue = NaN;
    component.cadValue = 10;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(false);
    expect(component.cadValue).toBe(10);
  });
});
