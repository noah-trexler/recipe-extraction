import { Pipe, PipeTransform } from '@angular/core';

import * as fractional from 'fractional';
// declare var fractional: any;

@Pipe({
  name: 'formatNumber',
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: string | number | null): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (value === 0.333) return '1/3';
    if (value === 0.666 || value === 0.667) return '2/3';
    return new fractional.Fraction(value).toString();
  }
}
