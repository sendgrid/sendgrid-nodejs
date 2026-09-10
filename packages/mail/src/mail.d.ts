import {Client} from "@sendgrid/client";
import {ClientResponse} from "@sendgrid/client/src/response";
import {ResponseError} from "@sendgrid/helpers/classes";
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";

declare class MailService {
  /**
   * SendGrid API key passthrough for convenience.
   */
  setApiKey(apiKey: string): void;

  /**
   * Client to use for invoking underlying API
   */
  setClient(client: Client): void;

  /**
   * Twilio Email Auth passthrough for convenience.
   */
  setTwilioEmailAuth(username: string, password: string): void;

  /**
   * Set the default request timeout (in milliseconds).
   */
  setTimeout(timeout: number): void;

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(left: string, right: string): void;

  /**
   * Send email
   */
  send(data: MailDataRequired | MailDataRequired[], isMultiple?: boolean, cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data: MailDataRequired, cb?: (error: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;
}

/**
 * The module exports the singleton, with the class attached as
 * `module.exports.MailService` (see index.js).
 */
declare namespace mail {
  export {MailService};
  export {MailDataRequired};
  export {ClientResponse};
  export {ResponseError};

  export function setApiKey(apiKey: string): void;
  export function setClient(client: Client): void;
  export function setTwilioEmailAuth(username: string, password: string): void;
  export function setTimeout(timeout: number): void;
  export function setSubstitutionWrappers(left: string, right: string): void;
  export function send(data: MailDataRequired | MailDataRequired[], isMultiple?: boolean, cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;
  export function sendMultiple(data: MailDataRequired, cb?: (error: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;
}

export = mail;
