import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pascalToKebabCase',
})
export class PascalToKebabCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    let result = value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();

    result = result.replace(/\s+/g, '-');

    return result;
  }
}
