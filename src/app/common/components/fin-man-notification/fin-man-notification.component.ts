import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PopUpNotification, NotificationTitle } from '@app/core/interfaces/notifications.schema';
import { NotificationService } from '@app/core/services/notifications.service';

@Component({
  selector: 'fin-man-notification',
  templateUrl: './fin-man-notification.component.html',
  styleUrls: ['./fin-man-notification.scss'],
})
export class FinManNotificationComponent implements OnInit, OnDestroy {
  notificationService = inject(NotificationService);

  notifications: PopUpNotification[] = [];

  notificationSubscription!: Subscription;

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.notifications$.subscribe(
      (notifications) => {
        this.notifications = notifications; // zaktualizuj stan komponentu po zmianach
      },
    );
  }

  ngOnDestroy(): void {
    this.notificationSubscription?.unsubscribe();
  }

  getNotificationTitle(type: 'success' | 'error' | 'info'): string {
    return NotificationTitle[type];
  }

  close(notification: PopUpNotification): void {
    this.notificationService.clearNotification(notification);
  }

  restartTimeout(notification: PopUpNotification): void {
    this.notificationService.restartTimeout(notification);

    const element = document.getElementById(`notification-${notification.id}`);
    if (element) {
      element.classList.remove('fade-out');
      void element.offsetWidth;
      element.classList.add('fade-out');
    }
  }
}
