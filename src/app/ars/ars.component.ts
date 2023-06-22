import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ars',
  templateUrl: './ars.component.html',
  styleUrls: ['./ars.component.scss']
})
export class ArsComponent implements OnInit {
  arsValue: number = 0;
  arsVariation: number = 0;
  arsLastUpdate: Date | null = null;
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

  fetchCurrencyDataArs() {
    const cacheData = localStorage.getItem('currencyDataArs');
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

    this.http.get('https://economia.awesomeapi.com.br/last/ARS-BRL').subscribe((data: any) => {
      const arsRate = data['ARSBRL'].ask;
      const arsVariation = data['ARSBRL'].varBid;
      const arsLastUpdate = data['ARSBRL'].create_date;

      this.arsValue = parseFloat(arsRate);
      this.arsVariation = parseFloat(arsVariation);
      this.arsLastUpdate = new Date(arsLastUpdate);

      const cacheData = {
        timestamp: new Date().getTime(),
        data: {
          arsValue: this.arsValue,
          arsVariation: this.arsVariation,
          arsLastUpdate: this.arsLastUpdate,
        }
      };
      localStorage.setItem('currencyDataArs', JSON.stringify(cacheData));
    });
  }

  updateCurrencyValues() {
    const cacheData = localStorage.getItem('currencyDataArs');
    if (cacheData) {
      const parsedData = JSON.parse(cacheData);
      const timestamp = parsedData.timestamp;
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - timestamp;

      if (timeDiff <= 180000) {
        this.arsValue = parsedData.data.arsValue;
        this.arsVariation = parsedData.data.arsVariation;
        this.arsLastUpdate = new Date(parsedData.data.arsLastUpdate);
        return;
      }
    }

    this.fetchCurrencyDataArs();
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

      this.brlValue = 1 / (this.arsValue * newValue);
    }
  }

  reloadPage() {
    this.loading = true;
    location.reload();
  }
}
