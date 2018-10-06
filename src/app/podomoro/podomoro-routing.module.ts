import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {TimerComponent} from './timer/timer.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {breadcrumb: false},
    children: [
      {path: '', component: TimerComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodomoroRoutingModule {
}
