import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output} from '@angular/core';
import {ModalConfig, Timer} from '../models/modal.interface';

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
    this.timer = {
      promodoro: 25,
      long: 10,
      short: 5
    };
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
    }
  }

  close() {
    this.dismiss.emit();
  }

  onConfirm() {
    this.close();
    this.confirm.updateTimer(this.timer);
  }

}
