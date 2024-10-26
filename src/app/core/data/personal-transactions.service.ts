import { Injectable } from '@angular/core';
import { YearlyPersonalTransactionsData } from '@app/core/interfaces/chart.schema';
import { Observable, of } from 'rxjs';
import { LineChartsMocks } from '@app/core/mocks/line-charts.mocks';

@Injectable()
export class PersonalTransactionsService {
  getChartLineData(): Observable<YearlyPersonalTransactionsData[]> {
    return of(LineChartsMocks);
  }
}
