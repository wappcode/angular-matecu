import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuTopbarLayoutComponent } from '../../components/matecu-topbar-layout/matecu-topbar-layout.component';
import { MatecuTopbarTitleComponent } from '../../components/matecu-topbar-title/matecu-topbar-title.component';
import { MatecuTopbarBodyComponent } from '../../components/matecu-topbar-body/matecu-topbar-body.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatecuTopbarFabComponent } from '../../components/matecu-topbar-fab/matecu-topbar-fab.component';
import { MatecuTopbarSearchComponent } from '../../components/matecu-topbar-search/matecu-topbar-search.component';
import { MatecuTopbarActionComponent } from '../../components/matecu-topbar-action/matecu-topbar-action.component';
import { MatecuTopbarHeaderRowComponent } from '../../components/matecu-topbar-header-row/matecu-topbar-header-row.component';
import { MatecuTopbarHeaderColumnComponent } from '../../components/matecu-topbar-header-column/matecu-topbar-header-column.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatecuTopbarLayoutComponent,
    MatecuTopbarTitleComponent,
    MatecuTopbarBodyComponent,
    MatecuTopbarFabComponent,
    MatecuTopbarSearchComponent,
    MatecuTopbarActionComponent,
    MatecuTopbarHeaderRowComponent,
    MatecuTopbarHeaderColumnComponent,
  ],
  exports: [
    MatecuTopbarLayoutComponent,
    MatecuTopbarTitleComponent,
    MatecuTopbarBodyComponent,
    MatecuTopbarFabComponent,
    MatecuTopbarSearchComponent,
    MatecuTopbarActionComponent,
    MatecuTopbarHeaderRowComponent,
    MatecuTopbarHeaderColumnComponent,
  ],
})
export class MatecuTopbarLayoutModule {}
