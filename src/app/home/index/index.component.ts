import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {Timer} from '../models/modal.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {

  timer: Timer = {
    promodoro: 25,
    long: 10,
    short: 5
  };

  constructor(public settings: ModalService) {
  }

  ngOnInit() {
  }

  openSettings() {
    this.settings.open({
      confirm: this
    });
  }

  updateTimer(timer) {
    if (timer) {
      this.timer = timer;
    }
  }
}
