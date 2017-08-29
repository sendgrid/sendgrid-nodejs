import Client = require("@sendgrid/client");
import {ResponseError} from "@sendgrid/helpers/classes";
import {MailData} from "@sendgrid/helpers/classes/mail";

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
  send(data: MailData, isMultiple?: boolean, cb?: (err: Error|ResponseError, result) => void): Promise<any>;

  /**
   * Send emails
   */
  send(data: MailData[], isMultiple?: boolean, cb?: (err: Error|ResponseError, result) => void): Promise<any>;

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data: MailData, cb?: (error: Error|ResponseError, result) => void): Promise<any>;
}

export = new MailService()