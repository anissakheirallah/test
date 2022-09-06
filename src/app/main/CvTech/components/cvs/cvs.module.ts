import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationComponent } from './education/education.component';
import { GlobalExperienceComponent } from './global-experience/global-experience.component';
import { SkillsComponent } from './skills/skills.component';

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

];

@NgModule({
  declarations: [
    SkillsComponent,
    EducationComponent,
    GlobalExperienceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CvsModule { }
