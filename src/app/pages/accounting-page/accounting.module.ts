import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { AccountingRoutingModule } from './accounting-routing.module';
import { TempLayoutsComponent } from './temp-layouts/temp-layouts.component';
import { AccountingComponent } from './accounting.component';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbAutocompleteModule } from '@nebular/theme';
@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbAutocompleteModule,
    AccountingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
  ],
  declarations: [

    TempLayoutsComponent,
    AccountingComponent,

  ],
})
export class AccountingModule { }
