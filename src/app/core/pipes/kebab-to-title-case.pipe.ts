import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabToTitle',
})
export class KebabToTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    const words = value.toString().split('-');

    // First letter of the word must be capitalized
    const titleCasedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );

    return titleCasedWords.join(' ');
  }
}
