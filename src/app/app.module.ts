import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { CvtechModule } from './main/CvTech/cvtech.module';
import { CompanyModule } from './main/company/company.module';
import { GrhModule } from './main/grh/grh.module';

import { ReactiveFormsModule } from '@angular/forms';

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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
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

    ReactiveFormsModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
