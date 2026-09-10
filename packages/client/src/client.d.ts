import {ResponseError} from "@sendgrid/helpers/classes";
import {ClientRequest} from "@sendgrid/client/src/request";
import {ClientResponse} from "@sendgrid/client/src/response";

declare class Client {
  constructor();

  /**
   * Set the SendGrid API key.
   */
  setApiKey(apiKey: string): void;

  /**
   * Set the Twilio Email credentials.
   */
  setTwilioEmailAuth(username: string, password: string): void;

  /**
   * Set client requests to impersonate a subuser
   */
  setImpersonateSubuser(subuser: string): void;

  /**
   * Set default header
   */
  setDefaultHeader(key: string | { [s: string]: string }, value ?: string): this;

  /**
   * Set default request
   */
  setDefaultRequest<K extends keyof ClientRequest>(key: K | ClientRequest, value ?: ClientRequest[K]): this;

  /**
   * Sets the data residency as per region provided
   */
  setDataResidency(region: string): this;

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

/**
 * The module exports the singleton, with the class attached as
 * `module.exports.Client` (see index.js), so both meanings of `Client` —
 * the value and the instance type — stay importable by name.
 */
declare namespace client {
  export {Client};

  export function setApiKey(apiKey: string): void;
  export function setTwilioEmailAuth(username: string, password: string): void;
  export function setImpersonateSubuser(subuser: string): void;
  export function setDefaultHeader(key: string | { [s: string]: string }, value ?: string): Client;
  export function setDefaultRequest<K extends keyof ClientRequest>(key: K | ClientRequest, value ?: ClientRequest[K]): Client;
  export function setDataResidency(region: string): Client;
  export function createHeaders(data: { [key: string]: string }): { [key: string]: string };
  export function createRequest(data: ClientRequest): ClientRequest;
  export function request(data: ClientRequest, cb?: (err: ResponseError, response: [ClientResponse, any]) => void): Promise<[ClientResponse, any]>;
}

export = client;
