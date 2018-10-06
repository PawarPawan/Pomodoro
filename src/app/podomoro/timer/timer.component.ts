import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {emptyTimer, Timer} from '../models/';
import {PushNotificationsService} from '../../services/';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {
  POMODORO = 25;
  alert = new Audio();
  focus = new Audio();
  tick = new Audio();
  _timer: Timer = emptyTimer;
  counter = 0;
  interval: any;
  m = 0;
  s = 0;
  startTimer = false;
  status = 'focus';
  pauseInterval = true;
  @Output() updateTimer = new EventEmitter<Timer>();

  @Input() set timer(timer: Timer) {
    if (timer) {
      this._timer = timer;
    } else {
      this._timer = emptyTimer;
    }
    this.stop();
    if (this._timer.pomodoro > 0) {
      this.POMODORO = ((this._timer.pomodoro * 30) - this._timer.short * this._timer.pomodoro) / this._timer.pomodoro;
      this.actionPomodoro(this.POMODORO);
      this.status = 'focus';
      this._timer.pomodoro--;
    }
  }

  constructor(public ref: ChangeDetectorRef, private _notificationService: PushNotificationsService) {
    this.alert.src = './assets/alert.mp3';
    this.alert.load();
    this.tick.src = './assets/tick.mp3';
    this.tick.load();
    this.focus.src = './assets/tedx.mp3';
    this.focus.load();
    this._notificationService.requestPermission();
  }

  actionPomodoro(time: number) {
    this.stop();
    this.counter = time * 60 * 1000;
    // this.max = time * 60 * 1000;
    if (time < 1) {
      this.s = time * 100;
    } else {
      this.m = time;
    }
    this.ref.markForCheck();
  }

  start() {
    if (this.counter > 0 && !this.startTimer) {
      this.startTimer = true;
      this.pauseInterval = false;
      this.interval = setInterval(() => {
        if (!this.pauseInterval) {
          this.counter -= 1000;
          this.m = Math.floor((this.counter / 1000) / 60);
          this.s = (this.counter / 1000) % 60;
          if (this.counter <= 10000) {
            this.tick.play();
          }
          if (this.counter <= 0) {
            this.stop();
            if (this.status === 'focus') {
              this.alert.play();
              this.status = 'rest';
              this.actionPomodoro(this._timer.short);
              this.start();
            } else if (this._timer.pomodoro > 0) {
              this.focus.play();
              this.status = 'focus';
              this.actionPomodoro(this.POMODORO);
              this._timer.pomodoro--;
              this.start();
            } else {
              this.status = 'stop';
            }
            this.notify();
          }
          this.ref.detectChanges();
        }
      }, 1000);
    }
  }

  stop() {
    this.m = 0;
    this.s = 0;
    this.counter = 0;
    this.startTimer = false;
    clearInterval(this.interval);
  }

  reset() {
    this.stop();
    console.log('reset not implemented yet');
  }

  notify() {
    const data = [];
    if (this.status === 'focus') {
      data.push({
        title: 'Start Focus again.',
        alertContent: 'It\'s Time for ' + this.POMODORO + ' Minute Focus :)'
      });
    } else if (this.status === 'rest') {
      data.push({
        title: 'Time Out',
        alertContent: 'It\'s Time for ' + this._timer.short + ' Minute Break :)'
      });
    } else if (this.status === 'stop') {
      // TODO emit event for task done.
      data.push({
        title: 'Done',
        alertContent: 'It\'s Time to focus on next task :)'
      });
    }
    this._notificationService.generateNotification(data);
  }

  done() {
    this._timer.status = true;
    this.updateTimer.emit(this._timer);
    this.ref.detectChanges();
  }

  delete() {
    this._timer.delete = true;
    this.updateTimer.emit(this._timer);
    this.ref.detectChanges();
  }

  pause() {
    this.pauseInterval = !this.pauseInterval;
  }
}
