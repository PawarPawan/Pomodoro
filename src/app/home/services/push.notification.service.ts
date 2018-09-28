/**
 * @project MyFocus
 * @name push.notification.service
 * @author Pawan Pawar
 * @date 28/9/18 - 6:28 PM
 * @description
 *
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class PushNotificationsService {
  public permission: Permission;

  constructor() {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }

  public isSupported(): boolean {
    return 'Notification' in window;
  }

  requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission((status) => {
        return this.permission = status;
      });
    }
  }

  create(title: string, options ?: PushNotification): any {
    return new Observable((obs) => {
      if (!('Notification' in window)) {
        obs.complete();
      }
      if (this.permission !== 'granted') {
        obs.complete();
      }
      const _notify = new Notification(title, options);
      _notify.onshow = (e) => {
        return obs.next({
          notification: _notify,
          event: e
        });
      };
      _notify.onclick = (e) => {
        return obs.next({
          notification: _notify,
          event: e
        });
      };
      _notify.onerror = (e) => {
        return obs.error({
          notification: _notify,
          event: e
        });
      };
      _notify.onclose = () => {
        return obs.complete();
      };
    });
  }

  generateNotification(source: Array<any>): void {
    source.forEach((item) => {
      const options = {
        body: item.alertContent,
        chrome_web_badge: 'assets/notification.png',
        chrome_web_icon: 'assets/notification.png',
        chrome_web_image: 'assets/notification.png',
        chrome_icon: 'assets/notification.png'
      };
      const notify = this.create(item.title, options).subscribe();
    });
  }
}

export declare type Permission = 'denied' | 'granted' | 'default';

export interface PushNotification {
  body?: string;
  chrome_web_image?: string;
  chrome_web_icon?: string;
  chrome_web_badge?: string;
  chrome_icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}
