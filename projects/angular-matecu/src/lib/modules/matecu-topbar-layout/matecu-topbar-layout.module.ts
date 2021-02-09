import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuTopbarLayoutComponent } from './components/matecu-topbar-layout/matecu-topbar-layout.component';
import { MatecuTopbarTitleComponent } from './components/matecu-topbar-title/matecu-topbar-title.component';
import { MatecuTopbarBodyComponent } from './components/matecu-topbar-body/matecu-topbar-body.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatecuTopbarFabComponent } from './components/matecu-topbar-fab/matecu-topbar-fab.component';




@NgModule({
  declarations: [MatecuTopbarLayoutComponent, MatecuTopbarTitleComponent, MatecuTopbarBodyComponent, MatecuTopbarFabComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [
    MatecuTopbarLayoutComponent, MatecuTopbarTitleComponent, MatecuTopbarBodyComponent, MatecuTopbarFabComponent
  ]
})
export class MatecuTopbarLayoutModule { }
