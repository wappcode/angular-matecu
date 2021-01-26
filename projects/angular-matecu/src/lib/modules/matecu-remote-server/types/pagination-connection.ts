export interface PaginationEdge<T> {
    cursor: string;
    node: T;
}
export interface PaginationInfo {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface PaginationConnection<T> {
    totalCount: number;
    edges: PaginationEdge<T>[];
    pageInfo: PaginationInfo;
}
