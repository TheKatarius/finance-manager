import { Pipe, PipeTransform } from '@angular/core';

import { CodeValueItem } from '@app/core/interfaces/code-value.schema';

@Pipe({
  name: 'mergeCodeName',
})
export class MergeCodeNamePipe implements PipeTransform {
  transform(value: CodeValueItem): string {
    return `${value.code} – ${value.value}`;
  }
}
