import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MatecuAbstractListService } from "../services/matecu-abstract-list-service";
import { ListDataModel } from "../types/list-service";

interface ItemModel {
  id: string;
  name: string;
  lastname: string;
}

@Injectable({
  providedIn: 'root',
})
export class MatecuAbstractListExtendedService extends MatecuAbstractListService<ItemModel> {
  protected getData(): Observable<ListDataModel<ItemModel>> {
    const edges = [
      { id: '1', name: 'Anastacio', lastname: 'Ramírez' },
      { id: '2', name: 'Benito', lastname: 'Pérez' },
    ];

    const data: ListDataModel<ItemModel> = {
      totalCount: 2,
      pageInfo: {
        endCursor: edges[edges.length - 1].id,
        hasNextPage: true,
        startCursor: edges[0].id,
        hasPreviousPage: false,
      },
      edges,
    };
    return of(data);
  }
}
