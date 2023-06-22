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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.updateCurrencyValues();
    setInterval(() => {
      this.updateCurrencyValues();
    }, 180000);
  }

  fetchCurrencyDataCad() {
    const cacheDataCad = localStorage.getItem('currencyDataCad');
    if (cacheDataCad) {
      const parsedData = JSON.parse(cacheDataCad);
      const timestamp = parsedData.timestamp;
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - timestamp;

      if (timeDiff <= 180000) {
        this.updateCurrencyValues();
        return;
      }
    }

    this.http.get('https://economia.awesomeapi.com.br/last/CAD-BRL').subscribe((data: any) => {
      const cadRate = data['CADBRL'].ask;
      const cadVariation = data['CADBRL'].varBid;
      const cadLastUpdate = data['CADBRL'].create_date;

      this.cadValue = parseFloat(cadRate);
      this.cadVariation = parseFloat(cadVariation);
      this.cadLastUpdate = new Date(cadLastUpdate);

      const cacheDataCad = {
        timestamp: new Date().getTime(),
        data: {
          cadValue: this.cadValue,
          cadVariation: this.cadVariation,
          cadLastUpdate: this.cadLastUpdate,
        }
      };
      localStorage.setItem('currencyDataCad', JSON.stringify(cacheDataCad));
    });
  }

  updateCurrencyValues() {
    const cacheDataCad = localStorage.getItem('currencyDataCad');
    if (cacheDataCad) {
      const parsedData = JSON.parse(cacheDataCad);
      const timestamp = parsedData.timestamp;
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - timestamp;

      if (timeDiff <= 180000) {
        this.cadValue = parsedData.data.cadValue;
        this.cadVariation = parsedData.data.cadVariation;
        this.cadLastUpdate = new Date(parsedData.data.cadLastUpdate);
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

      this.brlValue = this.cadValue * newValue;
    }
  }

  reloadPage() {
    this.loading = true;
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  formatNumberWithComma(value: number): string {
    const parts = value.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join(',');
  }

  isNumericValue(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }
}
