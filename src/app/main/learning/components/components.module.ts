import {RouterModule, Routes} from "@angular/router";
import {CvsComponent} from "../../CvTech/components/cvs/cvs.component";
import {DashboardComponent} from "../../CvTech/components/dashboard/dashboard.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CoreCommonModule} from "../../../../@core/common.module";
import {ContentHeaderModule} from "../../../layout/components/content-header/content-header.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CampaignModule} from "../../CvTech/components/campaign/campaign.module";
import {CandidatsModule} from "../../CvTech/components/candidats/candidats.module";
import { AddTrainingComponent } from './training/add-training/add-training.component';

const routes: Routes =
    [
        {
            path: 'training',
            loadChildren: () => import('./training/training.module').then(m => m.ComponentsModule)
        },

    ];

@NgModule({
    declarations: [

    
    AddTrainingComponent
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
        CandidatsModule
    ],

    providers: []
})
export class ComponentsModule { }
