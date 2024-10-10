import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from '@app/core/services/notifications.service';
import { NotificationTitle, PopUpNotification } from '@app/core/interfaces/notifications.schema';

@Component({
  selector: 'fin-man-notification',
  templateUrl: './fin-man-notification.component.html',
  styleUrls: ['./fin-man-notification.scss'],
})
export class FinManNotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);

  notifications: PopUpNotification[] = [];

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  getNotificationTitle(type: 'success' | 'error' | 'info'): string {
    return NotificationTitle[type];
  }

  close(notification: PopUpNotification): void {
    this.notificationService.clearNotification(notification);
  }
}
