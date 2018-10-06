import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { IndexComponent } from './index/index.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import {ClarityModule} from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ClarityModule
  ],
  declarations: [IndexComponent, SidemenuComponent]
})
export class ProjectsModule { }
