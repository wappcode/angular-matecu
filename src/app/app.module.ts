import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TopbarComponent } from './components/topbar/topbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatecuAlertBoxComponent, MatecuSpinnerComponent, MatecuTopbarActionsComponent, MatecuTopbarBodyComponent, MatecuTopbarFabComponent, MatecuTopbarLayoutComponent, MatecuTopbarLayoutModule, MatecuTopbarSearchComponent, MatecuTopbarTitleComponent } from '../../projects/angular-matecu/src/public-api';
import { TopbarNextComponent } from './components/topbar-next/topbar-next.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SpinnerComponent,
    TopbarComponent,
    AlertBoxComponent,
    AlertDialogComponent,
    SnackbarComponent,
    TopbarNextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatecuSpinnerComponent,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    // MatecuTopbarLayoutComponent,
    // MatecuTopbarTitleComponent,
    // MatecuTopbarBodyComponent,
    // MatecuTopbarActionsComponent,
    // MatecuTopbarSearchComponent,
    // MatecuTopbarFabComponent
    MatecuTopbarLayoutModule,
    MatIconModule,
    MatecuAlertBoxComponent,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
