type HttpMethod = 'get'|'GET'|'post'|'POST'|'put'|'PUT'|'patch'|'PATCH'|'delete'|'DELETE';

export interface RequestOptions<TData = any, TParams = object> {
    method?: HttpMethod | '*';
    url?: string;
    auth?: string;
    params?: TParams;
    data?: TData | '*';
    headers?: object | '*';
    ca?: string;
}

export class Request<TData = any> {
    constructor(opts: RequestOptions<TData>);
}
