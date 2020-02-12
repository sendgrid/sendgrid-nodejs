import {ResponseError} from "@sendgrid/helpers/classes";
import {ClientRequest} from "@sendgrid/client/src/request";
import {ClientResponse} from "@sendgrid/client/src/response";

declare class Client {
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
  setDefaultRequest<K extends keyof ClientRequest>(key: K, value: ClientRequest[K]): this;

  /**
   * Create headers for request
   */
  createHeaders(data: { [key: string]: string }): { [key: string]: string };

  /**
   * Create request
   */
  createRequest(data: ClientRequest): ClientRequest;

  /**
   * Do a request
   */
  request(data: ClientRequest, cb?: (err: ResponseError, response: [ClientResponse, any]) => void): Promise<[ClientResponse, any]>;
}

declare const client: Client & { Client: typeof Client };
export = client
