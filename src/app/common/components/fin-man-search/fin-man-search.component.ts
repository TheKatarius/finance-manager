import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VALIDATION } from '@app/core/constants/validators.const';
import { FinManInputTypes } from '@common/components/fin-man-input/fin-man-input-types';

@Component({
  selector: 'fin-man-search',
  templateUrl: './fin-man-search.component.html',
  styleUrls: ['./fin-man-search.scss'],
})
export class FinManSearchComponent {
  @Input() control: FormControl = new FormControl('');

  readonly VALIDATION = VALIDATION;

  readonly FinManInputTypes = FinManInputTypes;
}
