import {ResponseError} from "@sendgrid/helpers/classes";
import {ClientRequest} from "@sendgrid/client/src/request";
import {ClientResponse} from "@sendgrid/client/src/response";

type HttpMethod = 'get'| 'GET'|'post'|'POST'|'put'|'PUT'|'patch'|'PATCH'|'delete'|'DELETE';

declare class Client {
  constructor();
  /**
   * Set API key
   */
  setApiKey(apiKey: string): void;

  /**
   * Set default header
   */
  setDefaultHeader(key: string, value: string): this;

  /**
   * Set default request
   */
  setDefaultRequest<K extends keyof Client.RequestOptions>(key: K, value: Client.RequestOptions[K]): this;

  /**
   * Create headers for request
   */
  createHeaders(data: { [key: string]: string }): { [key: string]: string };

  /**
   * Create request
   */
  createRequest<TData>(data: Client.RequestOptions<TData>): ClientRequest;

  /**
   * Do a request
   */
  request<TData>(opts: Client.RequestOptions<TData>, cb?: (err: ResponseError, response: [ClientResponse, any]) => void): Promise<[ClientResponse, any]>;
}

declare namespace Client {
  export interface RequestOptions<TData = any, TParams = object> {
    /**
     * The HTTP method
     */
    method?: HttpMethod;
    /**
     * The request URI
     */
    url: string;
    /**
     * The username used for auth
     */
    username?: string;
    /**
     * The password used for auth
     */
    password?: string;
    /**
     * The request headers
     */
    headers?: Headers;
    /**
     * The object of params added as query string to the request
     */
    params?: TParams;
    /**
     * The form data that should be submitted
     */
    data?: TData;
  }

  export interface Headers {
    [header: string]: string;
  }
}

declare const client: Client & { Client: typeof Client };
export = client
