import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CvsComponent } from './cvs/cvs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampaignModule } from './campaign/campaign.module';
import { UsersModule } from './users/users.module';
import { profile } from 'console';
import { ProfileModule } from './profil/profile.module';
import { CandidatsModule } from './candidats/candidats.module';


const routes: Routes = 
[
    {
      path: 'campaign',
      loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('./profil/profile.module').then(m => m.ProfileModule)
    },
    {
      path: 'candidats',
      loadChildren: () => import('./candidats/candidats.module').then(m => m.CandidatsModule)
    },
    {
    path: 'cvs',
    component: CvsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [
    CvsComponent,
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
    NgbModule
  ],

  providers: []
})
export class ComponentsModule { }
