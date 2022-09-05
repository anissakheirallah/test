import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AvailabiltyComponent } from './availabilty/availabilty.component';
import { EducationLevelManagementComponent } from './education-level-management/education-level-management.component';
import { FunctionComponent } from './function/function.component';
import { GlobalExperienceManagementComponent } from './global-experience-management/global-experience-management.component';
import { SkillsComponent } from './skills/skills.component';
import { SituationComponent } from './situation/situation.component';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes = [
  {
    path: 'availabilty',
    component: AvailabiltyComponent,
  },
  {
    path: 'education',
    component: EducationLevelManagementComponent,
  },
  {
    path: 'function',
    component: FunctionComponent,
  },
  {
    path: 'experience',
    component: GlobalExperienceManagementComponent,
  },
  {
    path: 'situation',
    component: SituationComponent,
  },
  {
    path: 'skills',
    component: SkillsComponent,
  },
  
];

@NgModule({
  declarations: [
    AvailabiltyComponent,
    SkillsComponent,
    GlobalExperienceManagementComponent,
    EducationLevelManagementComponent,
    FunctionComponent,
    SituationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    CardSnippetModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],

  providers: []
})
export class ProfileModule { }
