'use strict';

/**
 * Dependencies
 */
const Content = require('./content');
const EmailAddress = require('./email-address');
const Personalization = require('./personalization');

/**
 * Mail class
 */
class Mail {

	/**
	 * Constructor
	 */
  constructor() {
    this.personalizations = [];
    this.attachments = [];
    this.contents = [];
    this.categories = [];
    this.headers = {};
    this.sections = {};
    this.customArgs = {};
    this.trackingSettings = {};
    this.mailSettings = {};
    this.asm = {};
  }

  /**
   * Set from email
   */
  setFrom(from) {
    if (from) {
      this.from = EmailAddress.create(from);
    }
    else {
      this.from = '';
    }
  }

  /**
   * Set reply to
   */
  setReplyTo(replyTo) {
    if (replyTo) {
      this.replyTo = EmailAddress.create(replyTo);
    }
    else {
      this.replyTo = '';
    }
  }

  /**
   * Set subject
   */
  setSubject(subject) {
    if (subject && typeof subject !== 'string') {
      throw new Error('String expected for `subject`');
    }
    this.subject = subject;
  }

  /**
   * Set send at
   */
  setSendAt(sendAt) {
    if (sendAt && !Number.isInteger(sendAt)) {
      throw new Error('Integer expected for `sendAt`');
    }
    this.sendAt = sendAt;
  }

  /**
   * Set template ID
   */
  setTemplateId(templateId) {
    if (templateId && typeof templateId !== 'string') {
      throw new Error('String expected for `templateId`');
    }
    this.templateId = templateId;
  }

  /**
   * Set batch ID
   */
  setBatchId(batchId) {
    if (batchId && typeof batchId !== 'string') {
      throw new Error('String expected for `batchId`');
    }
    this.batchId = batchId;
  }

  /**
   * Set IP pool name
   */
  setIpPoolName(ipPoolName) {
    if (ipPoolName && typeof ipPoolName !== 'string') {
      throw new Error('String expected for `ipPoolName`');
    }
    this.ipPoolName = ipPoolName;
  }

  /**
   * Set ASM
   */
  setAsm(asm) {
    if (!asm || typeof asm !== 'object') {
      throw new Error('Object expected for `asm`');
    }
    this.asm = asm;
  }

  /**
   * Set personalizations
   */
  setPersonalizations(personalizations) {
    if (!Array.isArray(personalizations)) {
      throw new Error('Array expected for `personalizations`');
    }
    this.personalizations = personalizations;
  }

  /**
   * Add personalization
   */
  addPersonalization(personalization) {
    this.personalizations.push(personalization);
  }

  /**
   * Add recipient (convenience method for quickly creating personalizations)
   */
  addTo(to) {
    const personalization = new Personalization(to);
    this.addPersonalization(personalization);
  }

  /**
   * Set contents
   */
  setContents(contents) {
    if (!Array.isArray(contents)) {
      throw new Error('Array expected for `contents`');
    }
    this.contents = contents;
  }

  /**
   * Add content
   */
  addContent(content) {
    this.contents.push(content);
  }

  /**
   * Add text content
   */
  addTextContent(text) {
    const content = new Content(text, 'text/plain');
    this.addContent(content);
  }

  /**
   * Add HTML content
   */
  addHtmlContent(html) {
    const content = new Content(html, 'text/html');
    this.addContent(content);
  }

  /**
   * Set attachments
   */
  setAttachments(attachments) {
    if (!Array.isArray(attachments)) {
      throw new Error('Array expected for `attachments`');
    }
    this.attachments = attachments;
  }

  /**
   * Add attachment
   */
  addAttachment(attachment) {
    this.attachments.push(attachment);
  }

  /**
   * Set categories
   */
  setCategories(categories) {
    if (!Array.isArray(categories) ||
        !categories.every(cat => typeof cat === 'string')) {
      throw new Error('Array of strings expected for `categories`');
    }
    this.categories = categories;
  }

  /**
   * Add category
   */
  addCategory(category) {
    if (typeof category !== 'string') {
      throw new Error('String expected for `category`');
    }
    this.categories.push(category);
  }

  /**
   * Set headers
   */
  setHeaders(headers) {
    if (!headers || typeof headers !== 'object') {
      throw new Error('Object expected for `headers`');
    }
    this.headers = headers;
  }

  /**
   * Add a header
   */
  addHeader(key, value) {
    this.headers[key] = value;
  }

  /**
   * Set sections
   */
  setSections(sections) {
    if (!sections || typeof sections !== 'object') {
      throw new Error('Object expected for `sections`');
    }
    this.sections = sections;
  }

  /**
   * Add a section
   */
  addSection(key, value) {
    this.sections[key] = value;
  }

  /**
   * Set custom args
   */
  setCustomArgs(customArgs) {
    if (!customArgs || typeof customArgs !== 'object') {
      throw new Error('Object expected for `customArgs`');
    }
    this.customArgs = customArgs;
  }

  /**
   * Add a custom arg
   */
  addCustomArg(key, value) {
    this.customArgs[key] = value;
  }

  /**
   * Set tracking settings
   */
  setTrackingSettings(settings) {
    if (!settings || typeof settings !== 'object') {
      throw new Error('Object expected for `settings`');
    }
    this.trackingSettings = settings;
  }

  /**
   * Add a tracking setting
   */
  addTrackingSetting(key, value) {
    this.trackingSettings[key] = value;
  }

  /**
   * Set mail settings
   */
  setMailSettings(settings) {
    if (!settings || typeof settings !== 'object') {
      throw new Error('Object expected for `settings`');
    }
    this.mailSettings = settings;
  }

  /**
   * Add a mail setting
   */
  addMailSetting(key, value) {
    this.mailSettings[key] = value;
  }

	/**
	 * To JSON
	 */
  toJSON() {

    //Initialize with mandatory values
    const json = {
      from: this.from,
      subject: this.subject,
      personalizations: this.personalizations.map(pers => pers.toJSON()),
      content: this.contents.map(content => content.toJSON()),
    };

    //Add whatever else we have
    if (Array.isArray(this.attachments) && this.attachments.length > 0) {
      json.attachments = this.attachments.map(att => att.toJSON());
    }
    if (Array.isArray(this.categories) && this.categories.length > 0) {
      json.categories = this.categories.filter(cat => cat !== '');
    }
    if (Object.keys(this.headers).length > 0) {
      json.headers = this.headers;
    }
    if (Object.keys(this.mailSettings).length > 0) {
      json.mail_settings = this.mailSettings;
    }
    if (Object.keys(this.trackingSettings).length > 0) {
      json.tracking_settings = this.trackingSettings;
    }
    if (Object.keys(this.customArgs).length > 0) {
      json.custom_args = this.customArgs;
    }
    if (Object.keys(this.sections).length > 0) {
      json.sections = this.sections;
    }
    if (Object.keys(this.asm).length > 0) {
      json.asm = this.asm;
    }
    if (this.replyTo) {
      json.reply_to = this.replyTo;
    }
    if (this.sendAt) {
      json.send_at = this.sendAt;
    }
    if (this.batchId) {
      json.batch_id = this.batchId;
    }
    if (this.templateId) {
      json.template_id = this.templateId;
    }
    if (this.ipPoolName) {
      json.ip_pool_name = this.ipPoolName;
    }

    //Return
    return json;
  }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create a Mail instance from given data
   */
  static create(data, isMultiple = false) {

    //Array? Convert items individually
    if (Array.isArray(data)) {
      return data.map(item => Mail.create(item));
    }

    //Already instance of Mail class?
    if (data instanceof Mail) {
      return data;
    }

    //No object
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided');
    }

    //Extract properties
    let {
      to, from, replyTo, sendAt, subject, text, html,
      substitutions, templateId,
    } = data;

    //Prepare mail instance
    const mail = new Mail();

    //Set global properties
    mail.setFrom(from);
    mail.setReplyTo(replyTo);
    mail.setSubject(subject);
    mail.setSendAt(sendAt);
    mail.setTemplateId(templateId);

    //Add content
    if (text) {
      mail.addTextContent(text);
    }
    if (html) {
      mail.addHtmlContent(html);
    }

    //Multiple individual emails
    if (isMultiple && Array.isArray(to)) {
      to.forEach(recipient => {
        const personalization = new Personalization(recipient);
        const sub = recipient.substitutions || substitutions;
        mail.addPersonalization(personalization, sub);
      });
    }

    //Single email (possibly with multiple recipients in the to field)
    else {
      const personalization = new Personalization(to);
      mail.addPersonalization(personalization, substitutions);
    }

    //Return the mail instance
    return mail;
  }
}

//Export class
module.exports = Mail;
