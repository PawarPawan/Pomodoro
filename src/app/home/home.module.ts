import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {ClarityModule} from '@clr/angular';
import {IndexComponent} from './index/index.component';
import {ModalService} from '../podomoro/services/modal.service';
import {FormsModule} from '@angular/forms';
import {PushNotificationsService} from '../services/push.notification.service';

@NgModule({
  providers: [
    PushNotificationsService
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ClarityModule
  ],
  declarations: [IndexComponent],
})
export class HomeModule {
}
