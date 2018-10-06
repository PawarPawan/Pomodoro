import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ModalService} from '../services/';
import {emptyTimer, Timer} from '../models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {

  showTimer = true;
  timer: Timer = emptyTimer;
  taskList: Timer[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly settings: ModalService,
    private readonly ref: ChangeDetectorRef
  ) {
    this.taskList = this.get();
    if (this.taskList === null) {
      this.taskList = [];
    }
  }

  openSettings() {
    this.settings.open({
      confirm: this
    });
  }

  updateTimer(timer: Timer) {
    if (timer) {
      // this.timer = Object.assign({}, timer);
      this.taskList = [...[], ...this.taskList, ...[timer]];
      this.set(timer);
      this.ref.detectChanges();
    }
  }

  getAction(action: string | number) {
    if (action === 'newtask') {
      this.openSettings();
    } else if (action === 'timer') {
      this.showTimer = true;
    } else if (typeof action === 'number') {
      this.taskList = this.get();
      this.timer = this.taskList[action];
      this.ref.detectChanges();
    } else {
      const cmd = action.split('|');
      if (cmd[0] === 'edit') {
        this.edit(cmd[1]);
      } else if (cmd[0] === 'delete') {
        this.delete(cmd[1]);
      }
    }
  }

  set(task: Timer) {
    let tl = JSON.parse(localStorage.getItem('taskList'));
    if (tl === null) {
      tl = {};
    }
    tl[task.title] = task;
    localStorage.setItem('taskList', JSON.stringify(tl));
    this.taskList = this.get();
    this.ref.detectChanges();
  }

  get(): Timer[] {
    const tl = JSON.parse(localStorage.getItem('taskList'));
    if (tl != null) {
      return Object.values(tl);
    } else {
      return [];
    }
  }

  delete(id: string) {
    const tl = JSON.parse(localStorage.getItem('taskList'));
    delete tl[id];
    localStorage.setItem('taskList', JSON.stringify(tl));
    this.taskList = this.get();
    this.ref.detectChanges();
  }

  edit(id: string) {
    this.settings.open({
      confirm: this,
      timer: this.taskList[id]
    });
  }
}
