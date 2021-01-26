import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatecuAbstractListServiceService } from '../services/matecu-abstract-list-service.service';
import { SortDirection } from '../../matecu-remote-server/types/sort';

export const changePage = <T>(
      pageSize: number,
      paginator: MatPaginator,
      page: PageEvent,
      service: MatecuAbstractListServiceService<T>
    ): void => {
  if (page.pageSize !== pageSize) {
    service.setLimit(page.pageSize);
    paginator.pageIndex = 0;
    pageSize = page.pageSize;
  } else {
    service.moveTowardsIndex(page.pageIndex);
  }
};

export const orderBy = <T>(event: Sort, service: MatecuAbstractListServiceService<T>): void => {
  if (
    typeof event.active !== 'string' ||
    event.active.length < 1 ||
    typeof event.direction !== 'string' ||
    event.direction.length < 1
  ) {
    service.setOrderBy('UPDATED', SortDirection.desc);
  } else {
    service.setOrderBy(
      event.active.toUpperCase(),
      event.direction.toUpperCase() as SortDirection
    );
  }
};

