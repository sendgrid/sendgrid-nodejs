import {ClientResponse} from "@sendgrid/client/src/response";
import {ResponseError} from "@sendgrid/helpers/classes";
import {MailContent, MailData} from "@sendgrid/helpers/classes/mail";

type MailDataRequired = MailData & (
  { text: string } | { html: string } | { content: MailContent[] & { 0: MailContent } });

declare class MailService {
  /**
   * API key pass through for convenience
   */
  setApiKey(apiKey: string): void;

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(left: string, right: string): void;

  /**
   * Send email
   */
  send(data: MailDataRequired, isMultiple?: boolean, cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;

  /**
   * Send emails
   */
  send(data: MailDataRequired[], isMultiple?: boolean, cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data: MailDataRequired, cb?: (error: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;
}

declare const mail: MailService & { MailService: typeof MailService };
export = mail
