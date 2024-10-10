import { Component, inject } from '@angular/core';
import { NotificationService } from '@app/core/services/notifications.service';

@Component({
  selector: 'finance-manager-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.someMethod();
  }

  someMethod() {
    this.notificationService.addNotification({
      status: 200,
      message: 'Logowanie zakończone sukcesem!',
      type: 'success',
    });

    this.notificationService.addNotification({
      type: 'error',
      status: 401,
      message: 'Unauthorized',
    });

    this.notificationService.addNotification({
      message: 'Transakcja została dodana',
      type: 'info',
    });
  }
}
