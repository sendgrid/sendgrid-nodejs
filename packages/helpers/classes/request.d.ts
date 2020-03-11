type HttpMethod = 'get'|'post'|'put'|'patch'|'delete';

declare namespace Request {
    export interface RequestOptions<TData = any, TParams = object> {
        method?: HttpMethod | '*';
        url?: string;
        auth?: string;
        params?: TParams;
        data?: TData | '*';
        headers?: object | '*';
        ca?: string;
    }
}

declare class Request<TData = any> {
    constructor(opts: Request.RequestOptions<TData>);
    private attributeEqual(lhs: any, rhs: any): boolean;
    isEqual(other: Request<any>): boolean;
    toString(): string;
}

export = Request;
