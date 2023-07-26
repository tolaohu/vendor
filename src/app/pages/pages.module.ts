/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesMenu } from './pages-menu';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbToggleModule,
  NbUserModule,
} from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { RegistrationComponent } from './com-part/registration/registration.component';
import { FilePickerComponent } from './com-share/file-picker/file-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from './com-share/custom-select/custom-select.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbToggleModule,
    NbProgressBarModule,
    NbMenuModule,
    NbStepperModule,
    NbTabsetModule,
    NbSpinnerModule,
    MiscellaneousModule,
    AuthModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    RegistrationComponent,
    FilePickerComponent,
    CustomSelectComponent,
  ],
  providers: [
    PagesMenu,
  ],
})
export class PagesModule {
}
