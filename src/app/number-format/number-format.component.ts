import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-format',
  template: 'R${{formattedValue }}',
})
export class NumberFormatComponent {
  @Input() value: number | null = null;

  get formattedValue(): string {
    if (this.value === null) {
      return '';
    }

    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.value);

    console.log( formatted, 'number component format');
    return formatted;
  }
}

