import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountingComponent } from './accounting.component';

import { TempLayoutsComponent } from './temp-layouts/temp-layouts.component';


const routes: Routes = [
  {
    path: '',
    component: AccountingComponent,
    children: [

      {
        path: 'layouts',
        component: TempLayoutsComponent,
      },

    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AccountingRoutingModule {
}

