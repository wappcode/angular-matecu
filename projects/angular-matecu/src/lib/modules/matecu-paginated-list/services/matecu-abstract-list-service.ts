import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { filter, debounceTime, switchMap, tap, map, takeUntil } from 'rxjs/operators';
import { ListDataModel, ListFilter, ListFilterGroup } from '../types/list-service';
import { OrderByModel } from '../../matecu-remote-server/types/order-by-model';
import { PaginationInfo } from '../../matecu-remote-server/types/pagination-connection';
import { SortDirection } from '../../matecu-remote-server/types/sort';

@Injectable({
  providedIn: 'root'
})
export abstract class MatecuAbstractListService<T> {


  public pageInfo$ = new BehaviorSubject<PaginationInfo | null>(null);
  public count$ = new BehaviorSubject<number>(0);
  public list$ = new BehaviorSubject<T[]>([]);
  public updateList$ = new BehaviorSubject<boolean>(true);
  protected destroy$ = new Subject();
  protected limit = 25;
  protected pageIndex = 0;
  protected pagination = {};
  protected orderBy: OrderByModel[] | null = [];
  protected defaultOrderBy: OrderByModel | null = null;
  protected filter: ListFilter | null = null;
  protected filterGroups: ListFilterGroup[] = [];


  /**
   * Recupera la lista de elementos aplicando filtros, orden y paginacion,
   * Utilizar  las variables: {pagination: this.pagination, orderBy: this.orderBy, filter: this.filter},
   * para generar la solicitud al servidor.
   * ejemplo graphql: {
   * return this.apollo.query({
   *   query: this.query,
   *   variables: {pagination: this.pagination, orderBy: this.orderBy, filter: this.filter},
   * }).pipe(
   *   map(({data}: any) => data.connection as PaginationConnection<T>),
   *   map(createListDataFromConnection),
   * );
   * }
   */
  protected abstract getData(): Observable<ListDataModel<T>>;


  constructor() { }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  init(limit: number): Observable<boolean> {
    this.limit = limit || this.limit;
    this.pagination = { first: this.limit };
    return this.updateList$.pipe(
      filter(ok => !!ok),
      debounceTime(1000),
      switchMap(() => this.getData()),
      tap((data) => this.pageInfo$.next(data.pageInfo)),
      tap((data) => this.count$.next(data.totalCount)),
      tap((data) => this.list$.next(data.edges)),
      map(() => true),
      takeUntil(this.destroy$)
    );
  }

  setLimit(limit: number): void {
    if (this.limit !== limit) {
      this.pageIndex = 0;
      this.limit = limit;
      this.pagination = { first: this.limit };
      this.updateList$.next(true);
    }
  }
  /**
   * cambia la pagina mas cerca del indice pasado como parámetro
   * @param number index
   */
  moveTowardsIndex(index: number): void {
    if (this.pageIndex > index) {
      this.movePrevious();
      this.pageIndex = this.pageIndex > 0 ? this.pageIndex - 1 : 0;
    }
    if (this.pageIndex < index) {
      this.moveNext();
      this.pageIndex = this.pageIndex + 1;
    }
    this.pageIndex = index;
  }
  moveNext(): void {
    const after = (this.pageInfo$) ? this.pageInfo$.value : null;
    this.pagination = { first: this.limit, after };
    this.updateList$.next(true);
  }
  movePrevious(): void {
    const before = (this.pageInfo$) ? this.pageInfo$.value : null;
    this.pagination = { last: this.limit, before };
    this.updateList$.next(true);
  }
  moveFirst(): void {
    this.pagination = { first: this.limit };
    this.updateList$.next(true);
  }
  moveLast(): void {
    this.pagination = { last: this.limit };
    this.updateList$.next(true);
  }

  setOrderBy(field?: string, direction?: SortDirection): void {
    if (typeof (field) !== 'string' || field.length < 1 || typeof (direction) !== 'string' || direction.length < 1) {
      this.orderBy = !!this.defaultOrderBy ? [this.defaultOrderBy] : null;
    } else {
      this.orderBy = [{ field, direction }];
    }
    this.updateList$.next(true);
  }

  /**
   * Funcion para hacer busquedas o filtrar los registros de la lista
   */
  addFilterGroup<G>(key: string, group: any): void {
    this.removeFilterGroup(key);
    this.filterGroups.push({ key, group });
    this.setFilter();
  }
  /**
   * Remueve un filtro que esta aplicado en los registros de la lista
   * @param string key
   */
  removeFilterGroup(key: string): void {
    this.filterGroups = this.filterGroups.filter(g => g.key !== key);
    this.setFilter();
  }

  /**
   * Establese los filtros o condiciones que se deben aplicar al query
   */
  protected setFilter(): void {
    if (this.filterGroups.length > 0) {
      this.filter = { groups: this.filterGroups.map(g => g.group) };
    } else {
      this.filter = null;
    }
    this.updateList$.next(true);
  }



}
