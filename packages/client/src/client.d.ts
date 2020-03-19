import {ResponseError} from "@sendgrid/helpers/classes";
import RequestOptions from "@sendgrid/client/src/request";
import {ClientResponse} from "@sendgrid/client/src/response";

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
  setDefaultRequest<K extends keyof RequestOptions>(key: K, value: RequestOptions[K]): this;

  /**
   * Create headers for request
   */
  createHeaders(data: { [key: string]: string }): { [key: string]: string };

  /**
   * Create request
   */
  createRequest<TData>(data: RequestOptions<TData>): RequestOptions<TData>;

  /**
   * Do a request
   */
  request<TData>(opts: RequestOptions<TData>, cb?: (err: ResponseError, response: [ClientResponse, any]) => void): Promise<[ClientResponse, any]>;
}

declare const client: Client & { Client: typeof Client };
export = client
