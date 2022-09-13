import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AllcontratComponent } from './allcontrat/allcontrat.component';

const routes: Routes = [
  {
    path: 'Allcontrats',
    //loadChildren: () => import('./commercial/commercial.module').then(m => m.CommercialModule)
    component: AllcontratComponent
  }

]


@NgModule({
  declarations: [
    AllcontratComponent
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
export class ContratModule { }
