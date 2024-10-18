import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Colors } from 'chart.js';
import { interval, Subscription } from 'rxjs';

import { COLORS } from '@app/core/constants/colors.const';

@Component({
  selector: 'fin-man-circle-progress-bar',
  templateUrl: './fin-man-circle-progress-bar.component.html',
  styleUrls: ['./fin-man-circle-progress-bar.scss'],
})
export class FinManCircleProgressBarComponent implements OnInit, OnDestroy {
  @Input() duration: number = 86400; // Time in seconds
  @Input() startDate: string = new Date().toISOString().split('T')[0];
  @Input() endDate: string = new Date().toISOString().split('T')[0];

  readonly COLORS = COLORS;

  private timerSubscription!: Subscription;

  progress = 0; // Initial progress in percents
  radius = 155;
  circumference = 2 * Math.PI * this.radius;
  remainingTime: string = this.convertSecondsToTime(this.duration);

  ngOnInit(): void {
    this.setProgress(this.progress);
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  setProgress(percent: number): void {
    const circle = document.querySelector('.progress-ring__circle') as SVGCircleElement;
    circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;

    const offset = (100 - percent / 100) * this.circumference;
    circle.style.strokeDashoffset = `${offset}`;
  }

  startTimer(): void {
    let timeElapsed = 0;

    this.timerSubscription = interval(1000).subscribe(() => {
      timeElapsed += 1;
      this.progress = (timeElapsed / this.duration) * 100;
      this.remainingTime = this.convertSecondsToTime(this.duration - timeElapsed);

      this.setProgress(this.progress);

      if (timeElapsed >= this.duration) {
        this.timerSubscription?.unsubscribe();
      }
    });
  }

  convertSecondsToTime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds - days * 86400) / 3600);
    const minutes = Math.floor((seconds - days * 86400 - hours * 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  getDateOnly(date: Date): Date {
    console.log();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
