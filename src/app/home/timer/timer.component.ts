import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Timer} from '../models/modal.interface';
import {PushNotificationsService} from '../services/push.notification.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {

  alert = new Audio();
  tick = new Audio();
  _timer: Timer;
  counter = 0;
  interval: any;
  m = 0;
  s = 0;

  @Input() set timer(timer: Timer) {
    this._timer = timer;
    this.stop();
  }

  constructor(public ref: ChangeDetectorRef, private _notificationService: PushNotificationsService) {
    this.alert.src = './assets/alert.mp3';
    this.alert.load();
    this.tick.src = './assets/tick.mp3';
    this.tick.load();
    this._notificationService.requestPermission();
  }

  actionPromodoro(time: number) {
    this.stop();
    this.counter = time * 60 * 1000;
    if (time < 1) {
      this.s = time * 100;
    } else {
      this.m = time;
    }
    this.ref.markForCheck();
  }

  start() {
    if (this.counter > 0) {
      this.interval = setInterval(() => {
        this.counter -= 1000;
        this.m = Math.floor((this.counter / 1000) / 60);
        this.s = (this.counter / 1000) % 60;
        if (this.counter <= 10000) {
          this.tick.play();
        }
        if (this.counter <= 0) {
          this.alert.play();
          this.notify();
          this.stop();
        }
        this.ref.markForCheck();
      }, 1000);
    }
  }

  stop() {
    this.m = 0;
    this.s = 0;
    this.counter = 0;
    clearInterval(this.interval);
  }

  reset() {
    this.stop();
    console.log('reset not implemented yet');
  }

  notify() {
    const data = [];
    data.push({
      title: 'Time Out',
      alertContent: 'It Time for ' + this._timer.short + ' Minute Break :)'
    });
    this._notificationService.generateNotification(data);
  }

}
