import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CoreCommonModule } from "../../../../@core/common.module";
import { ContentHeaderModule } from "../../../layout/components/content-header/content-header.module";
import { CampaignModule } from "../../CvTech/components/campaign/campaign.module";
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
    ],

    providers: []
})
export class ComponentsModule { }
