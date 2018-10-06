import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output} from '@angular/core';
import {emptyTimer, ModalConfig, Timer} from '../models/modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  @Output() dismiss = new EventEmitter();

  timer: Timer;
  confirm: any;

  constructor() {
    this.timer = emptyTimer;
  }

  @HostListener('click', ['$event'])
  onMouseClick($event: MouseEvent) {
    if ($event.toElement.classList.contains('settings')) {
      this.close();
    }
  }

  @HostListener('keyup.esc', ['$event'])
  onEscapeKey($event: KeyboardEvent) {
    if (!$event.defaultPrevented) {
      this.close();
    }
  }

  setConfirm(param: ModalConfig) {
    if (confirm) {
      this.confirm = param.confirm;
      if (param.timer) {
        this.timer = param.timer;
      }
    }
  }

  close() {
    this.dismiss.emit();
  }

  onConfirm() {
    this.close();
    this.timer.datetime = new Date().getTime();
    this.timer.status = false;
    this.timer.delete = false;
    this.confirm.updateTimer(this.timer);
  }

  updatePomodoro() {
    this.timer.pomodoro = this.timer.totaltime * 2;
  }
}
