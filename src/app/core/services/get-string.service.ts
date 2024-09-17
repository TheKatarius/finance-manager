import { Injectable } from '@angular/core';
import { StringsDataConst } from '@app/core/data/strings-data.const';

@Injectable({
  providedIn: 'root',
})
export class GetStringService {
  get(...name: string[]): string {
    let resultString = StringsDataConst;

    for (const key of name) {
      if (resultString?.[key] !== undefined) {
        resultString = resultString[key];
      } else {
        return 'COULD NOT FIND INDICATED STRING';
      }
    }

    if (typeof resultString === 'object') {
      return 'INDICATED STRING IS AN OBJECT';
    }

    return resultString as unknown as string;
  }
}
