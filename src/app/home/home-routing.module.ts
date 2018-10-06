import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {PodomoroModule} from '../podomoro/podomoro.module';

const routes: Routes = [{
  path: '',
  component: IndexComponent,
  data: {breadcrumb: false},
  children: [
    {path: '', redirectTo: 'podomoro', pathMatch: 'full'},
    {path: '', loadChildren: () => PodomoroModule, data: {breadcrumb: 'Timer'}}
    // {path: 'timelog', loadChildren: () => TimeLogBookModule, data: {breadcrumb: 'Time Log Book'}}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
