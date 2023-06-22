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
    const cacheDataGbp = localStorage.getItem('currencyDataGbp');
    if (cacheDataGbp) {
      const parsedData = JSON.parse(cacheDataGbp);
      const timestamp = parsedData.timestamp;
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - timestamp;

      if (timeDiff <= 180000) {
        this.updateCurrencyValues();
        return;
      }
    }

    this.http.get('https://economia.awesomeapi.com.br/last/GBP-BRL').subscribe(
      (data: any) => {
        const gbpRate = data.GBPBRL.bid;
        const gbpVariation = data.GBPBRL.varBid;
        const gbpLastUpdate = data.GBPBRL.create_date;

        this.gbpValue = parseFloat(gbpRate);
        this.gbpVariation = parseFloat(gbpVariation);
        this.gbpLastUpdate = new Date(gbpLastUpdate);

        const cacheDataGbp = {
          timestamp: new Date().getTime(),
          data: {
            gbpValue: this.gbpValue,
            gbpVariation: this.gbpVariation,
            gbpLastUpdate: this.gbpLastUpdate,
          },
        };
        localStorage.setItem('currencyDataGbp', JSON.stringify(cacheDataGbp));
      },
      (error) => {
        console.error('Ocorreu um erro ao obter os dados da API:', error);
      }
    );
  }

  updateCurrencyValues() {
    const cacheDataGbp = localStorage.getItem('currencyDataGbp');
    if (cacheDataGbp) {
      const parsedData = JSON.parse(cacheDataGbp);
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
    if (!this.gbpValue) {
      return;
    }

    if (this.gbpValue === 1) {
      this.showFixedConversionMessage = true;
    } else {
      this.showFixedConversionMessage = false;

      const newValue = parseFloat(this.gbpValue.toString());

      this.gbpValue = 1 / newValue;
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
