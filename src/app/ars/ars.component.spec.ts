import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArsComponent } from './ars.component';

describe('ArsComponent', () => {
  let component: ArsComponent;
  let fixture: ComponentFixture<ArsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArsComponent],
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(ArsComponent);
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
        arsValue: 5,
        arsVariation: 0.5,
        arsLastUpdate: new Date()
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cacheData));
    spyOn(component, 'fetchCurrencyDataArs');
    component.updateCurrencyValues();
    expect(component.arsValue).toBe(5);
    expect(component.arsVariation).toBe(0.5);
    expect(component.arsLastUpdate).toEqual(new Date(cacheData.data.arsLastUpdate));
    expect(component.fetchCurrencyDataArs).not.toHaveBeenCalled();
  });

  it('Buscar dados de moeda se o cache estiver expirado', () => {
    const cacheData = {
      timestamp: new Date().getTime() - 200000,
      data: {
        arsValue: 5,
        arsVariation: 0.5,
        arsLastUpdate: new Date()
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cacheData));
    spyOn(component, 'fetchCurrencyDataArs');
    component.updateCurrencyValues();
    expect(component.fetchCurrencyDataArs).toHaveBeenCalled();
  });

  it('Definir a cor da moeda com base no valor', () => {
    expect(component.getCurrencyColor(0.5)).toBe('#dd4b4b');
    expect(component.getCurrencyColor(3)).toBe('#3c7649');
    expect(component.getCurrencyColor(8)).toBe('#3684cb');
  });

  it('Converter para moeda se brlValue for válido', () => {
    component.brlValue = 2;
    component.arsValue = 10;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(false);
    expect(component.arsValue).toBe(20);
  });

  it('Mostrar mensagem de conversão fixa se brlValue for 1', () => {
    component.brlValue = 1;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(true);
  });

  it('Não deve converter para moeda se brlValue for nulo', () => {
    component.brlValue = null;
    component.arsValue = 10;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(false);
    expect(component.arsValue).toBe(10);
  });

  it('Não deve converter para moeda se brlValue for NaN', () => {
    component.brlValue = NaN;
    component.arsValue = 10;
    component.convertToCurrency();
    expect(component.showFixedConversionMessage).toBe(false);
    expect(component.arsValue).toBe(10);
  });
});
