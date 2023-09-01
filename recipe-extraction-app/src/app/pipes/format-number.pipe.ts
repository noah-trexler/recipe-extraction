import { Pipe, PipeTransform } from '@angular/core';

import * as fractional from 'fractional';

@Pipe({
  name: 'formatNumber',
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: string | number | null): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return new fractional.Fraction(value).toString();
  }
}
