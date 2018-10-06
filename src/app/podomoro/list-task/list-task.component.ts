import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {Timer} from '../models';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTaskComponent {

  _taskList: Timer[] = [];
  today: number = new Date().getTime() - (24 * 60 * 60 * 1000);

  @Output() getAction = new EventEmitter<string | number>();

  @Input() set taskList(taskList: Timer[]) {
    if (taskList && taskList.length > 0) {
      this._taskList = taskList;
    } else {
      this._taskList = [];
    }
  }

  constructor(public ref: ChangeDetectorRef) {
    console.log(this.today);
  }

  trackById(index: number) {
    return index;
  }
}
