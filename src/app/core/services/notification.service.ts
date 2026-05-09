import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor() {}

  getNotifications(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }

  showSuccess(message: string, duration: number = 3000) {
    this.addNotification(message, 'success', duration);
  }

  showError(message: string, duration: number = 4000) {
    this.addNotification(message, 'error', duration);
  }

  showWarning(message: string, duration: number = 3000) {
    this.addNotification(message, 'warning', duration);
  }

  showInfo(message: string, duration: number = 3000) {
    this.addNotification(message, 'info', duration);
  }

  private addNotification(message: string, type: 'success' | 'error' | 'warning' | 'info', duration: number) {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = { id, message, type, duration };

    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);

    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, duration);
    }
  }

  removeNotification(id: string) {
    const current = this.notifications$.value;
    this.notifications$.next(current.filter(n => n.id !== id));
  }
}
