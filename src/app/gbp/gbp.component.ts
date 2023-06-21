import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gbp',
  templateUrl: './gbp.component.html',
  styleUrls: ['./gbp.component.scss']
})
export class GbpComponent implements OnInit {
  gbpValue: number = 0;
  gbpVariation: number = 0;
  gbpLastUpdate: Date | null = null;
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

  fetchCurrencyDataGbp() {
    const cacheData = localStorage.getItem('currencyDataGbp');
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

    this.http.get('https://economia.awesomeapi.com.br/last/GBP-BRL').subscribe((data: any) => {
      const gbpRate = data.GBPBRL.ask;
      const gbpVariation = data.GBPBRL.pctChange;
      const gbpLastUpdate = data.GBPBRL.create_date;

      this.gbpValue = 1 / gbpRate;
      this.gbpVariation = gbpVariation;
      this.gbpLastUpdate = new Date(gbpLastUpdate);

      const cacheData = {
        timestamp: new Date().getTime(),
        data: {
          gbpValue: this.gbpValue,
          gbpVariation: this.gbpVariation,
          gbpLastUpdate: this.gbpLastUpdate,
        }
      };
      localStorage.setItem('currencyDataGbp', JSON.stringify(cacheData));
    });
  }

  updateCurrencyValues() {
    const cacheData = localStorage.getItem('currencyDataGbp');
    if (cacheData) {
      const parsedData = JSON.parse(cacheData);
      const timestamp = parsedData.timestamp;
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - timestamp;
  
      if (timeDiff <= 180000) { 
        this.gbpValue = parsedData.data.gbpValue;
        this.gbpVariation = parsedData.data.gbpVariation;
        this.gbpLastUpdate = new Date(parsedData.data.gbpLastUpdate);
        return;
      }
    }

    this.fetchCurrencyDataGbp();
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
  
      this.gbpValue = this.gbpValue * newValue;
    }
  }

  reloadPage() {
    this.loading = true;
    location.reload();
  }
}
