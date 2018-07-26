import MailService = require("@sendgrid/mail");
import {ClientResponse} from "@sendgrid/client/src/response";
import {ResponseError} from "@sendgrid/helpers/classes";
import {MailData} from "@sendgrid/helpers/classes/mail";

declare class SendgridTransport {
  /**
   * Send email
   */
  send(data: MailData, cb?: (err: Error|ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;
}

declare const transport: SendgridTransport & { SendrigTransport: SendgridTransport }
export = transport