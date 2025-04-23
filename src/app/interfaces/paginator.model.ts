export interface Filters{
    name?: string;
    plan?: number | null;
    status?: string | null;
    period?: string | null;
}

export interface Parameters<T>{
    page: number;
    limit: number;
    filters: T;
}

export interface PaginatorModel<TData, TMeta> {
    data: TData;
    meta: TMeta;
}