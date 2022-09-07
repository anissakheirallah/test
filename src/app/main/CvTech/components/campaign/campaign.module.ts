import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { FunctionComponent } from './function/function.component';

const routes: Routes = [
  {
    path: 'addcampaign',
    component: AddCampaignComponent,
  },
  {
    path: 'function',
    component: FunctionComponent
  },
  {
    path: 'allcampaigns',
    loadChildren: () => import('./all-campaigns/all-campaigns.module').then(m => m.AllCampaignModule)
  },
];

@NgModule({
  declarations: [
    AddCampaignComponent,
    FunctionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxDatatableModule,
    CardSnippetModule,
    SweetAlert2Module.forRoot()
  ],

  providers: []
})
export class CampaignModule { }
