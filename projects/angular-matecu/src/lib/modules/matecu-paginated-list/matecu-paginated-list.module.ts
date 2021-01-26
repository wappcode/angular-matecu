import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuPaginatedListComponent } from './components/matecu-paginated-list/matecu-paginated-list.component';
import { MatecuRemoteServerModule } from '../matecu-remote-server/matecu-remote-server.module';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [MatecuPaginatedListComponent],
  imports: [
    CommonModule,
    MatecuRemoteServerModule,
    MatPaginatorModule
  ]
})
export class MatecuPaginatedListModule { }
