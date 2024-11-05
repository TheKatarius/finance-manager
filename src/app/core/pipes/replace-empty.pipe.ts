import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceEmpty',
})
export class ReplaceEmptyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '–';

    return value;
  }
}
