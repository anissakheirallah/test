import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { EducationComponent } from './education/education.component';
import { GlobalExperienceComponent } from './global-experience/global-experience.component';
import { SkillsComponent } from './skills/skills.component';
import { AddCvComponent } from './add-cv/add-cv.component';

const routes: Routes = [
  {
    path: 'education',
    component: EducationComponent,
  },
  {
    path: 'experience',
    component: GlobalExperienceComponent,
  },
  {
    path: 'skills',
    component: SkillsComponent,
  },
  {
    path: 'addCv',
    component: AddCvComponent,
  },

];

@NgModule({
  declarations: [
    SkillsComponent,
    EducationComponent,
    GlobalExperienceComponent,
    AddCvComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxDatatableModule,
  ]
})
export class CvsModule { }
