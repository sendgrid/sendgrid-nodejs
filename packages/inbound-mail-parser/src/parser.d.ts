import {Attachment} from "@sendgrid/helpers/classes"

declare interface ParseConfig {
  keys: string[];
}

declare interface ParseRequest {
  body?: {};
  payload?: {};
  files?: any[];
}

declare class Parse {
  constructor(config: ParseConfig, request: ParseRequest);

  /**
   * Return an object literal of key/values in the payload received from webhook
   * @return {Object} Valid key/values in the webhook payload
   */
  keyValues(): { [key: string]: any };

  /**
   * Whether the payload contains the raw email (Only applies to raw payloads)
   * @return {Boolean}
   */
  hasRawEmail(): boolean;

  /**
   * Parses the raw email and returns the mail object in a callback (Only applies to raw payloads)
   * @param {Function} callback Function which will receive the parsed email object as the sole argument
   */
  getRawEmail(callback: (mail: any) => void): void; 
  // TODO: Type information for MailParser result in callback

  /**
   * Retrieves all attachments received from the webhook payload
   * @param {Function} callback Function which will receive an array, of attachments found, as the sole argument
   */
  attachments(callback: (attachments: Attachment[]) => void): void;
}

export = Parse;