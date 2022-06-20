import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';


const routes: Routes = 
[
  {
  path: 'addDepartment',
  component: AddDepartmentComponent,
  },
  {
    path: 'allDepartment',
    component:AllDepartmentsComponent,
  }
];

@NgModule({
  declarations: [
    AddDepartmentComponent,
    AllDepartmentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxDatatableModule
  ],

  providers: []
})
export class DepartmentModule { }