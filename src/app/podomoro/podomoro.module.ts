import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PodomoroRoutingModule} from './podomoro-routing.module';
import {TimerComponent} from './timer/timer.component';
import {SettingsComponent} from './settings/settings.component';
import {IndexComponent} from './index/index.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule} from '@angular/forms';
import {ListTaskComponent} from './list-task/list-task.component';
import {ModalService} from './services/';
import { RoundProgressModule } from 'angular-svg-round-progressbar'; // <-- here

@NgModule({
  providers: [ModalService],
  imports: [
    CommonModule,
    FormsModule,
    PodomoroRoutingModule,
    ClarityModule,
    RoundProgressModule
  ],
  declarations: [TimerComponent, SettingsComponent, IndexComponent, ListTaskComponent],
  entryComponents: [SettingsComponent],
  exports: [SettingsComponent]
})
export class PodomoroModule {
}
