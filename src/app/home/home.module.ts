import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {ClarityModule} from '@clr/angular';
import {IndexComponent} from './index/index.component';
import {TimerComponent} from './timer/timer.component';
import {SettingsComponent} from './settings/settings.component';
import {ModalService} from './services/modal.service';
import {FormsModule} from '@angular/forms';
import {PushNotificationsService} from './services/push.notification.service';

@NgModule({
  providers: [
    ModalService,
    PushNotificationsService
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ClarityModule
  ],
  declarations: [IndexComponent, TimerComponent, SettingsComponent],
  entryComponents: [SettingsComponent]
})
export class HomeModule {
}
