import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PopUpNotification } from '@app/core/interfaces/notifications.schema';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<PopUpNotification[]>([]);

  notifications$ = this.notificationsSubject.asObservable();

  id: number = 0;

  addNotification(notification: PopUpNotification): void {
    const notificationWithId = { ...notification, id: this.id++ };
    this.notificationsSubject.next([...this.notificationsSubject.value, notificationWithId]);

    this.startFading(notificationWithId);
  }

  clearNotification(notification: PopUpNotification): void {
    const removedNotificationIndex = this.findNotificationIndex(notification);
    this.notificationsSubject.value.splice(removedNotificationIndex, 1);
    const updatedNotifications = this.notificationsSubject.value.map((n) =>
      n.id && n.id > removedNotificationIndex ? { ...n, id: n.id - 1 } : n,
    ) as PopUpNotification[];

    this.notificationsSubject.next(updatedNotifications);
  }

  private startFading(notification: PopUpNotification): void {
    const notifications = this.notificationsSubject.value;
    const notificationIndex = this.findNotificationIndex(notification);

    if (notificationIndex !== -1) {
      notifications[notificationIndex].timeoutId = window.setTimeout(() => {
        if (notifications?.[notificationIndex]) {
          this.clearNotification(notifications?.[notificationIndex]);
        } else {
          this.clearNotification(notifications?.[notificationIndex - 1]);
        }
      }, 10000);
      // When changed time, change it also in scss
    }
  }

  restartTimeout(notification: PopUpNotification): void {
    const foundNotification = this.notificationsSubject.value.find((n) => n.id === notification.id);

    if (foundNotification) {
      clearTimeout(foundNotification?.timeoutId);
      this.startFading(notification);
    }
  }

  private findNotificationIndex(notification: PopUpNotification): number {
    return this.notificationsSubject.value.findIndex((n) => n.id === notification.id);
  }
}
