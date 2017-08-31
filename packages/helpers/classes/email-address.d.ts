export type EmailData = string|{ name?: string; email: string; }

export type EmailJSON = { name?: string; email: string }

export default class EmailAddress {
  constructor(data?: EmailData);

  /**
   * From data
   */
  fromData(data: EmailData);

  /**
   * Set name
   */
  setName(name: string);

  /**
   * Set email (mandatory)
   */
  setEmail(email: string);

  toJSON(): EmailJSON;
}