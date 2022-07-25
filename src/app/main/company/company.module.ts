import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { AllCompaniesComponent } from './components/company/all-companies/all-companies.component';
import { CompanyDetailsComponent } from './components/company/all-companies/company-details/company-details.component';
import { CompanyentityDetailsComponent } from './components/company-entity/all-entities/companyentity-details/companyentity-details.component';
import { AllEntitiesComponent } from './components/company-entity/all-entities/all-entities.component';
import { AddCompanyentityComponent } from './components/company-entity/add-companyentity/add-companyentity.component';
const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
  },
  
];

@NgModule({
  declarations: [
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
    NgbPaginationModule
  ],

  providers: []
})
export class CompanyModule { }
