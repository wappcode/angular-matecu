import { PaginationInfo } from '../../matecu-remote-server/types/pagination-connection';




export interface ListFilterGroup {
    key: string;
    group: any;
}

export interface ListDataModel<T> {
    pageInfo: PaginationInfo;
    totalCount: number;
    edges: T[];
}

export interface ListFilter {
    groups: ListFilterGroup[];
}
