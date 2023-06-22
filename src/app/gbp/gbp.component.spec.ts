import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GbpComponent } from './gbp.component';

describe('GbpComponent', () => {
  let component: GbpComponent;
  let fixture: ComponentFixture<GbpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GbpComponent],
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(GbpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Criar o component', () => {
    expect(component).toBeTruthy();
  });

  it('Atualizar os valores da moeda do cache, se disponível', () => {
    const cacheData = {
      timestamp: new Date().getTime(),
      data: {
        gbpValue: 5,
        gbpVariation: 0.5,
        gbpLastUpdate: new Date()
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cacheData));
    spyOn(component, 'fetchCurrencyDataGbp');
    component.updateCurrencyValues();
    expect(component.gbpValue).toBe(5);
    expect(component.gbpVariation).toBe(0.5);
    expect(component.gbpLastUpdate).toEqual(new Date(cacheData.data.gbpLastUpdate));
    expect(component.fetchCurrencyDataGbp).not.toHaveBeenCalled();
  });

  it('Buscar dados de moeda se o cache estiver expirado', () => {
    const cacheData = {
      timestamp: new Date().getTime() - 200000,
      data: {
        gbpValue: 5,
        gbpVariation: 0.5,
        gbpLastUpdate: new Date()
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cacheData));
    spyOn(component, 'fetchCurrencyDataGbp');
    component.updateCurrencyValues();
    expect(component.fetchCurrencyDataGbp).toHaveBeenCalled();
  });

  it('Definir a cor da moeda com base no valor', () => {
    expect(component.getCurrencyColor(0.5)).toBe('#dd4b4b');
    expect(component.getCurrencyColor(3)).toBe('#3c7649');
    expect(component.getCurrencyColor(8)).toBe('#3684cb');
  });

  it('Converter para moeda se brlValue for válido', () => {
    component.brlValue = 2;
    component.gbpValue = 10;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(false);
    expect(component.gbpValue).toBe(20);
  });

  it('Mostrar mensagem de conversão fixa se brlValue for 1', () => {
    component.brlValue = 1;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(true);
  });

  it('Não deve converter para moeda se brlValue for nulo', () => {
    component.brlValue = null;
    component.gbpValue = 10;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(false);
    expect(component.gbpValue).toBe(10);
  });

  it('Não deve converter para moeda se brlValue for NaN', () => {
    component.brlValue = NaN;
    component.gbpValue = 10;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(false);
    expect(component.gbpValue).toBe(10);
  });
});
