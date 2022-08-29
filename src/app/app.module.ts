import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { CoreModule } from '@core/core.module';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { CompanyModule } from './main/company/company.module';
import { CvtechModule } from './main/CvTech/cvtech.module';
import { VacationModule } from './main/grh/components/vacation/vacation.module';
import { GrhModule } from './main/grh/grh.module';
import { CommercialModule } from './main/vente/components/commercial/commercial.module';
import { ComponentsModule } from './main/vente/components/components.module';
import { ProjectsModule } from './main/vente/components/projects/projects.module';
import { VenteModule } from './main/vente/vente.module';

const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'cvtech',
    loadChildren: () => import('./main/CvTech/cvtech.module').then(m => m.CvtechModule)
  },
  {
    path: 'companies',
    loadChildren: () => import('./main/company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'grh',
    loadChildren: () => import('./main/grh/grh.module').then(m => m.GrhModule)
  },
  {
    path: 'vente',
    loadChildren: () => import('./main/vente/vente.module').then(m => m.VenteModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
 
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule,
    CvtechModule,
    CompanyModule,
    GrhModule,
    VacationModule,
    VenteModule,
    ComponentsModule,
    ProjectsModule,
    CommercialModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
