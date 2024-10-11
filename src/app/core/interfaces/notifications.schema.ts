export interface PopUpNotification {
  id?: number;
  type: 'success' | 'error' | 'info';
  status?: number;
  message: string;
  timeoutId?: number;
}

export enum NotificationTitle {
  success = 'Operacja zakończona sukcesem!',
  error = 'Wystąpił błąd podczas operacji!',
  info = 'Informacja zwrotna',
}
