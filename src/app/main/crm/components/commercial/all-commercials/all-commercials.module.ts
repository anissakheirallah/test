import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AllCommercialsComponent } from './all-commercials.component';
import { CommercialDetailsComponent } from './commercial-details/commercial-details.component';


const routes: Routes = [
  { path: '', component: AllCommercialsComponent },
  {
    path: 'commercial-details/:commercial_id',
    component:CommercialDetailsComponent ,
  }
];

@NgModule({
  declarations: [
    AllCommercialsComponent,
    CommercialDetailsComponent
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
  ]
})
export class AllCommercialsModule { }
