import Client = require("@naturalcycles/sendgrid-client");
import { ClientResponse } from "@naturalcycles/sendgrid-client/src/response";
import { ResponseError } from "@naturalcycles/sendgrid-helpers/classes";
import { MailData } from "@naturalcycles/sendgrid-helpers/classes/mail";

declare class MailService {
  constructor();
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
  send(
    data: MailData,
    isMultiple?: boolean,
    cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void
  ): Promise<[ClientResponse, {}]>;

  /**
   * Send emails
   */
  send(
    data: MailData[],
    isMultiple?: boolean,
    cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void
  ): Promise<[ClientResponse, {}]>;

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(
    data: MailData,
    cb?: (error: Error | ResponseError, result: [ClientResponse, {}]) => void
  ): Promise<[ClientResponse, {}]>;
}

declare const _default: MailService;
export = _default;
