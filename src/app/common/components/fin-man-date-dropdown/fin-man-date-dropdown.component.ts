import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fin-man-date-dropdown',
  templateUrl: './fin-man-date-dropdown.component.html',
  styleUrls: ['./fin-man-date-dropdown.scss'],
})
export class FinManDateDropdownComponent implements OnInit {
  @Input() startYear: number = new Date().getFullYear() - 10; // Domyślny rok początkowy
  @Input() endYear: number = new Date().getFullYear(); // Domyślny rok końcowy
  @Input() selectedYear: number = this.endYear;

  @Output() selectedYearChange: EventEmitter<number> = new EventEmitter<number>();

  years: number[] = [];

  ngOnInit(): void {
    this.generateYears();
  }

  generateYears(): void {
    for (let year = this.endYear; year >= this.startYear; --year) {
      this.years.push(year);
    }
  }

  onYearChange(year: number): void {
    this.selectedYearChange.emit(year);
  }
}
