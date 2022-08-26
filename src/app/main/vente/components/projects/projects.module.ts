import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';

const routes: Routes = [
  {
    path: "add-project",
    component: AddProjectComponent
  }
]

@NgModule({
  declarations: [
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectsModule { }
