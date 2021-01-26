import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { changePage, orderBy } from '../../functions/matecu-paginated-list.fn';
import { MatecuAbstractListServiceService } from '../../services/matecu-abstract-list-service.service';

@Component({
  selector: 'matecu-paginated-list',
  templateUrl: './matecu-paginated-list.component.html',
  styleUrls: ['./matecu-paginated-list.component.scss']
})
export class MatecuPaginatedListComponent<T> implements OnInit{

  list$: Observable<T[]> | null = null;
  @Input() sizeOptions: number[] = [25, 50, 100];
  @Input() size = 25;
  count$: Observable<number> | null = null;
  @ViewChild('paginator', { static: true }) public paginator: MatPaginator | null = null;
  @Input() listService: MatecuAbstractListServiceService<T> | null = null;
  constructor() {
  }

  /**
   * Llamar a este método en el método ngOnInit de la subclase
   */
  ngOnInit(): void {
    this.initService();
  }
  orderBy(event: Sort): void {
    if (!!this.listService) {
      orderBy(event, this.listService);

    }
  }
  changePage(page: PageEvent): void {
    if (!!this.paginator && !!this.listService) {
      changePage(this.size, this.paginator, page, this.listService );
    }
  }

  private initService(): void {
    if (!!this.listService) {
      this.list$ = this.listService.list$;
      this.count$ = this.listService.count$;
      this.listService.init(this.size);
    }
  }


}
