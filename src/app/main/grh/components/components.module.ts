import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AddEmployeeVacationComponent } from './employee-vacation/add-employee-vacation/add-employee-vacation.component';
import { AllVacationComponent } from './employee-vacation/all-vacation/all-vacation.component';

const routes: Routes =
  [
    {
      //path: 'vacation',
      //loadChildren: () => import('./employee-vacation/employee-vacation.component').then(m => m.EmployeeVacationComponent)
    },
    {
      path: 'add-vacation',
      component: AddEmployeeVacationComponent,
    },
    {
      path: 'all-vacation',
      component: AllVacationComponent,
    }
  ];

@NgModule({
  declarations: [
    AddEmployeeVacationComponent,
    AllVacationComponent
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
  ],

  providers: []
})
export class ComponentsModule { }
