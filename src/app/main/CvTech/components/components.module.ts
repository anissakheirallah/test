import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CampaignModule } from './campaign/campaign.module';
import { CandidatsModule } from './candidats/candidats.module';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes =
  [
    {
      path: 'campaign',
      loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule)
    },
    {
      path: 'candidats',
      loadChildren: () => import('./candidats/candidats.module').then(m => m.CandidatsModule)
    },
    {
      path: 'cvs',
      loadChildren: () => import('./cvs/cvs.module').then(m => m.CvsModule)
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
  ];

@NgModule({
  declarations: [
    DashboardComponent
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
    CampaignModule,
    CandidatsModule,
  ],

  providers: []
})
export class ComponentsModule { }
