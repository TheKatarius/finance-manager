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
    this.id += 1;

    const notificationWithId = { ...notification, id: this.id };
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notificationWithId]);

    this.startFading(notificationWithId);
  }

  clearNotification(notification: PopUpNotification): void {
    const updatedNotifications = this.notificationsSubject.value.filter(
      (n) => n.id !== notification.id,
    );
    this.notificationsSubject.next(updatedNotifications);
  }

  private startFading(notification: PopUpNotification): void {
    const notifications = this.notificationsSubject.value;
    const notificationIndex = notifications.findIndex((n) => n.id === notification.id);
    if (notificationIndex !== -1) {
      setTimeout(() => {
        this.clearNotification(notifications[notificationIndex]);
      }, 15000);
    }
  }
}
