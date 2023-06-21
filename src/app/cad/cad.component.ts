import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cad',
  templateUrl: './cad.component.html',
  styleUrls: ['./cad.component.scss']
})
export class CadComponent implements OnInit {
  cadValue: number = 0;
  cadVariation: number = 0;
  cadLastUpdate: Date | null = null;
  fixedBrlValue: number = 1;
  brlValue: number | null = null;
  showFixedConversionMessage: boolean = false;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.updateCurrencyValues();
    setInterval(() => {
      this.updateCurrencyValues();
    }, 180000);
  }

  fetchCurrencyDataCad() {
    const cacheData = localStorage.getItem('currencyDataCad');
    if (cacheData) {
      const parsedData = JSON.parse(cacheData);
      const timestamp = parsedData.timestamp;
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - timestamp;
    
      if (timeDiff <= 180000) { 
        this.updateCurrencyValues(); 
        return;
      }
    }

    this.http.get('https://economia.awesomeapi.com.br/last/CAD-BRL').subscribe((data: any) => {
      const cadRate = data.CADBRL.ask;
      const cadVariation = data.CADBRL.pctChange;
      const cadLastUpdate = data.CADBRL.create_date;

      this.cadValue = 1 / cadRate;
      this.cadVariation = cadVariation;
      this.cadLastUpdate = new Date(cadLastUpdate);

      const cacheData = {
        timestamp: new Date().getTime(),
        data: {
          cadValue: this.cadValue,
          cadVariation: this.cadVariation,
          cadLastUpdate: this.cadLastUpdate,
        }
      };
      localStorage.setItem('currencyDataCad', JSON.stringify(cacheData));
    });
  }

  updateCurrencyValues() {
    const cacheData = localStorage.getItem('currencyDataCad');
    if (cacheData) {
      const parsedData = JSON.parse(cacheData);
      const timestamp = parsedData.timestamp;
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - timestamp;
  
      if (timeDiff <= 180000) { 
        const cachedValues = parsedData.data;
        this.cadValue = cachedValues.cadValue;
        this.cadVariation = cachedValues.cadVariation;
        this.cadLastUpdate = new Date(cachedValues.cadLastUpdate);
        return;
      }
    }

    this.fetchCurrencyDataCad();
  }

  getCurrencyColor(value: number): string {
    if (value <= 1) {
      return '#dd4b4b';
    } else if (value <= 5) {
      return '#3c7649';
    } else {
      return '#3684cb';
    }
  }

  convertToCurrency() {
    if (this.brlValue === null || isNaN(this.brlValue)) {
      return;
    }
  
    if (this.brlValue === 1) {
      this.showFixedConversionMessage = true;
    } else {
      this.showFixedConversionMessage = false;
  
      const newValue = parseFloat(this.brlValue.toString());
  
      this.cadValue = this.cadValue * newValue;
    }
  }

  reloadPage() {
    this.loading = true;
    location.reload();
  }
}
