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
import {
  MatecuAlertBoxModule,
  MatecuSpinnerModule,
} from 'projects/angular-matecu/src/public-api';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MatecuTopbarLayoutModule } from 'projects/angular-matecu/src/lib/modules/matecu-topbar-layout/matecu-topbar-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SpinnerComponent,
    TopbarComponent,
    AlertBoxComponent,
    AlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatecuSpinnerModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatecuTopbarLayoutModule,
    MatIconModule,
    MatecuAlertBoxModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
