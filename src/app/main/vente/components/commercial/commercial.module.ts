import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AddCommercialComponent } from './add-commercial/add-commercial.component';


const routes: Routes = 
[
  {
    path: 'addcommercial',
    component: AddCommercialComponent,
  },
  {
    path: 'allcommercials', 
    loadChildren: () => import('./all-commercials/all-commercials.module').then(m => m.AllCommercialsModule)
  },
];


@NgModule({
  declarations: [
  
    AddCommercialComponent
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
    SweetAlert2Module.forRoot()
  ]
})
export class CommercialModule { }
