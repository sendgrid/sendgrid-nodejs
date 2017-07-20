'use strict';

/**
 * Dependencies
 */
const EmailAddress = require('./email-address');
const Personalization = require('./personalization');
const toCamelCase = require('../helpers/to-camel-case');
const toSnakeCase = require('../helpers/to-snake-case');
const deepClone = require('../helpers/deep-clone');
const arrayToJSON = require('../helpers/array-to-json');

/**
 * Mail class
 */
class Mail {

	/**
	 * Constructor
	 */
  constructor(data) {

    //Initialize array and object properties
    this.personalizations = [];
    this.attachments = [];
    this.content = [];
    this.categories = [];
    this.headers = {};
    this.sections = {};
    this.customArgs = {};
    this.trackingSettings = {};
    this.mailSettings = {};
    this.asm = {};

    //Process data if given
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * Build from data
   */
  fromData(data) {

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Mail data');
    }

    //Convert to camel case to make it workable, making a copy to prevent
    //changes to the original objects
    data = deepClone(data);
    data = toCamelCase(data);

    //Extract properties from data
    const {
      to, from, replyTo, cc, bcc, sendAt, subject, text, html, content,
      templateId, personalizations, attachments, ipPoolName, batchId,
      sections, headers, categories, customArgs, asm, mailSettings,
      trackingSettings, substitutions, substitutionWrappers, isMultiple,
    } = data;

    //Set data
    this.setFrom(from);
    this.setReplyTo(replyTo);
    this.setSubject(subject);
    this.setSendAt(sendAt);
    this.setTemplateId(templateId);
    this.setBatchId(batchId);
    this.setIpPoolName(ipPoolName);
    this.setAttachments(attachments);
    this.setContent(content);
    this.setSections(sections);
    this.setHeaders(headers);
    this.setCategories(categories);
    this.setCustomArgs(customArgs);
    this.setAsm(asm);
    this.setMailSettings(mailSettings);
    this.setTrackingSettings(trackingSettings);
    this.setPersonalizations(personalizations);

    //Add contents from text/html properties
    this.addTextContent(text);
    this.addHtmlContent(html);

    //Use to property for personalizations
    if (to) {

      //Create base data for personalizations
      const baseData = {
        cc,
        bcc,
        substitutions,
        substitutionWrappers,
      };

      //Multiple individual emails
      if (isMultiple && Array.isArray(to)) {
        to.forEach(to => {
          const toData = Object.assign({}, baseData, {to});
          if (to.substitutions) {
            toData.substitutions = to.substitutions;
          }
          this.addTo(toData);
        });
      }

      //Single email (possibly with multiple recipients in the to field)
      else {
        const toData = Object.assign({}, baseData, {to});
        this.addTo(toData);
      }
    }
  }

  /**
   * Set from email
   */
  setFrom(from) {
    if (typeof from === 'undefined') {
      return;
    }
    this.from = EmailAddress.create(from);
  }

  /**
   * Set reply to
   */
  setReplyTo(replyTo) {
    if (typeof replyTo === 'undefined') {
      return;
    }
    this.replyTo = EmailAddress.create(replyTo);
  }

  /**
   * Set subject
   */
  setSubject(subject) {
    if (typeof subject === 'undefined') {
      return;
    }
    if (typeof subject !== 'string') {
      throw new Error('String expected for `subject`');
    }
    this.subject = subject;
  }

  /**
   * Set send at
   */
  setSendAt(sendAt) {
    if (typeof sendAt === 'undefined') {
      return;
    }
    if (!Number.isInteger(sendAt)) {
      throw new Error('Integer expected for `sendAt`');
    }
    this.sendAt = sendAt;
  }

  /**
   * Set template ID
   */
  setTemplateId(templateId) {
    if (typeof templateId === 'undefined') {
      return;
    }
    if (typeof templateId !== 'string') {
      throw new Error('String expected for `templateId`');
    }
    this.templateId = templateId;
  }

  /**
   * Set batch ID
   */
  setBatchId(batchId) {
    if (typeof batchId === 'undefined') {
      return;
    }
    if (typeof batchId !== 'string') {
      throw new Error('String expected for `batchId`');
    }
    this.batchId = batchId;
  }

  /**
   * Set IP pool name
   */
  setIpPoolName(ipPoolName) {
    if (typeof ipPoolName === 'undefined') {
      return;
    }
    if (typeof ipPoolName !== 'string') {
      throw new Error('String expected for `ipPoolName`');
    }
    this.ipPoolName = ipPoolName;
  }

  /**
   * Set ASM
   */
  setAsm(asm) {
    if (typeof asm === 'undefined') {
      return;
    }
    if (typeof asm !== 'object') {
      throw new Error('Object expected for `asm`');
    }
    this.asm = asm;
  }

  /**
   * Set personalizations
   */
  setPersonalizations(personalizations) {
    if (typeof personalizations === 'undefined') {
      return;
    }
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
  addTo(data) {
    this.addPersonalization(new Personalization(data));
  }

  /**
   * Set content
   */
  setContent(content) {
    if (typeof content === 'undefined') {
      return;
    }
    if (!Array.isArray(content)) {
      throw new Error('Array expected for `content`');
    }
    this.content = content;
  }

  /**
   * Add content
   */
  addContent(content) {
    if (typeof content !== 'object') {
      throw new Error('Object expected for `content`');
    }
    this.content.push(content);
  }

  /**
   * Add text content
   */
  addTextContent(text) {
    if (typeof text === 'undefined') {
      return;
    }
    if (typeof text !== 'string') {
      throw new Error('String expected for `text`');
    }
    this.addContent({
      value: text,
      type: 'text/plain',
    });
  }

  /**
   * Add HTML content
   */
  addHtmlContent(html) {
    if (typeof html === 'undefined') {
      return;
    }
    if (typeof html !== 'string') {
      throw new Error('String expected for `html`');
    }
    this.addContent({
      value: html,
      type: 'text/html',
    });
  }

  /**
   * Set attachments
   */
  setAttachments(attachments) {
    if (typeof attachments === 'undefined') {
      return;
    }
    if (!Array.isArray(attachments)) {
      throw new Error('Array expected for `attachments`');
    }
    this.attachments = attachments;
  }

  /**
   * Add attachment
   */
  addAttachment(attachment) {
    if (typeof attachment !== 'object') {
      throw new Error('Object expected for `attachment`');
    }
    this.attachments.push(attachment);
  }

  /**
   * Set categories
   */
  setCategories(categories) {
    if (typeof categories === 'undefined') {
      return;
    }
    if (typeof categories === 'string') {
      categories = [categories];
    }
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
    if (typeof headers === 'undefined') {
      return;
    }
    if (typeof headers !== 'object') {
      throw new Error('Object expected for `headers`');
    }
    this.headers = headers;
  }

  /**
   * Add a header
   */
  addHeader(key, value) {
    if (typeof key !== 'string') {
      throw new Error('String expected for header key');
    }
    if (typeof value !== 'string') {
      throw new Error('String expected for header value');
    }
    this.headers[key] = value;
  }

  /**
   * Set sections
   */
  setSections(sections) {
    if (typeof sections === 'undefined') {
      return;
    }
    if (typeof sections !== 'object') {
      throw new Error('Object expected for `sections`');
    }
    this.sections = sections;
  }

  /**
   * Set custom args
   */
  setCustomArgs(customArgs) {
    if (typeof customArgs === 'undefined') {
      return;
    }
    if (typeof customArgs !== 'object') {
      throw new Error('Object expected for `customArgs`');
    }
    this.customArgs = customArgs;
  }

  /**
   * Set tracking settings
   */
  setTrackingSettings(settings) {
    if (typeof settings === 'undefined') {
      return;
    }
    if (typeof settings !== 'object') {
      throw new Error('Object expected for `trackingSettings`');
    }
    this.trackingSettings = settings;
  }

  /**
   * Set mail settings
   */
  setMailSettings(settings) {
    if (typeof settings === 'undefined') {
      return;
    }
    if (typeof settings !== 'object') {
      throw new Error('Object expected for `mailSettings`');
    }
    this.mailSettings = settings;
  }

	/**
	 * To JSON
	 */
  toJSON() {

    //Extract properties from self
    const {
      from, replyTo, sendAt, subject, content, templateId,
      personalizations, attachments, ipPoolName, batchId, asm,
      sections, headers, categories, customArgs, mailSettings,
      trackingSettings,
    } = this;

    //Initialize with mandatory values
    const json = {
      from, subject, content,
      personalizations: arrayToJSON(personalizations),
    };

    //Array properties
    if (Array.isArray(attachments) && attachments.length > 0) {
      json.attachments = arrayToJSON(attachments);
    }
    if (Array.isArray(categories) && categories.length > 0) {
      json.categories = categories.filter(cat => cat !== '');
    }

    //Object properties
    if (Object.keys(headers).length > 0) {
      json.headers = headers;
    }
    if (Object.keys(mailSettings).length > 0) {
      json.mailSettings = mailSettings;
    }
    if (Object.keys(trackingSettings).length > 0) {
      json.trackingSettings = trackingSettings;
    }
    if (Object.keys(customArgs).length > 0) {
      json.customArgs = customArgs;
    }
    if (Object.keys(sections).length > 0) {
      json.sections = sections;
    }
    if (Object.keys(asm).length > 0) {
      json.asm = asm;
    }

    //Simple properties
    if (typeof replyTo !== 'undefined') {
      json.replyTo = replyTo;
    }
    if (typeof sendAt !== 'undefined') {
      json.sendAt = sendAt;
    }
    if (typeof batchId !== 'undefined') {
      json.batchId = batchId;
    }
    if (typeof templateId !== 'undefined') {
      json.templateId = templateId;
    }
    if (typeof ipPoolName !== 'undefined') {
      json.ipPoolName = ipPoolName;
    }

    //Return as snake cased object
    return toSnakeCase(json);
  }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create a Mail instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of Mail class?
    if (data instanceof Mail) {
      return data;
    }

    //Create instance
    return new Mail(data);
  }
}

//Export class
module.exports = Mail;
