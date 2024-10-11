import { Component, inject, OnInit } from '@angular/core';

import { PopUpNotification, NotificationTitle } from '@app/core/interfaces/notifications.schema';
import { NotificationService } from '@app/core/services/notifications.service';

@Component({
  selector: 'fin-man-notification',
  templateUrl: './fin-man-notification.component.html',
  styleUrls: ['./fin-man-notification.scss'],
})
export class FinManNotificationComponent implements OnInit {
  notificationService = inject(NotificationService);

  notifications: PopUpNotification[] = [];

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications; // zaktualizuj stan komponentu po zmianach
    });
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
