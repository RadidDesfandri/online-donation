export interface Pagination {
  totalData: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface QueryPagination {
  page?: number;
  limit?: number;
  search?: string;
}
