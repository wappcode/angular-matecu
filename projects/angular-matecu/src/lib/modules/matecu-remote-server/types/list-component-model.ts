import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { AbstractListService } from '../services/abstract-list.service';
import { EntityModel } from './entity-model';
export interface ListComponentModel<T extends EntityModel> {
    list$: Observable<T[]>;
    pageSizeOptions: number[];
    pageSize: number;
    count$: Observable<number>;
    paginator: MatPaginator;
    componentService: AbstractListService<T>;
    init(): void;
    orderBy(event: Sort): void;
    changePage(page: PageEvent): void;

}
