'use strict';

/**
 * Dependencies
 */
const EmailAddress = require('./email-address');
const Personalization = require('./personalization');
const toCamelCase = require('../helpers/to-camel-case');
const toSnakeCase = require('../helpers/to-snake-case');

/**
 * Mail class
 */
class Mail {

	/**
	 * Constructor
	 */
  constructor(data, isMultiple) {

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
      this.fromData(data, isMultiple);
    }
  }

  /**
   * Build from data
   */
  fromData(data, isMultiple = false) {

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Mail data');
    }

    //Convert to camel case to make it workable
    data = toCamelCase(data);

    //Extract properties from data
    const {
      to, from, replyTo, sendAt, subject, text, html, content, templateId,
      personalizations, attachments, substitutions, ipPoolName, batchId, asm,
      sections, headers, categories, customArgs, mailSettings, trackingSettings,
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

      //Multiple individual emails
      if (isMultiple && Array.isArray(to)) {
        to.forEach(to => this.addTo(to, to.substitutions || substitutions));
      }

      //Single email (possibly with multiple recipients in the to field)
      else {
        this.addTo(to, substitutions);
      }
    }
  }

  /**
   * Set from email
   */
  setFrom(from) {
    if (typeof from !== 'undefined') {
      this.from = EmailAddress.create(from);
    }
  }

  /**
   * Set reply to
   */
  setReplyTo(replyTo) {
    if (typeof replyTo !== 'undefined') {
      this.replyTo = EmailAddress.create(replyTo);
    }
  }

  /**
   * Set subject
   */
  setSubject(subject) {
    if (typeof subject !== 'undefined') {
      if (typeof subject !== 'string') {
        throw new Error('String expected for `subject`');
      }
      this.subject = subject;
    }
  }

  /**
   * Set send at
   */
  setSendAt(sendAt) {
    if (typeof sendAt !== 'undefined') {
      if (!Number.isInteger(sendAt)) {
        throw new Error('Integer expected for `sendAt`');
      }
      this.sendAt = sendAt;
    }
  }

  /**
   * Set template ID
   */
  setTemplateId(templateId) {
    if (typeof templateId !== 'undefined') {
      if (typeof templateId !== 'string') {
        throw new Error('String expected for `templateId`');
      }
      this.templateId = templateId;
    }
  }

  /**
   * Set batch ID
   */
  setBatchId(batchId) {
    if (typeof batchId !== 'undefined') {
      if (typeof batchId !== 'string') {
        throw new Error('String expected for `batchId`');
      }
      this.batchId = batchId;
    }
  }

  /**
   * Set IP pool name
   */
  setIpPoolName(ipPoolName) {
    if (typeof ipPoolName !== 'undefined') {
      if (typeof ipPoolName !== 'string') {
        throw new Error('String expected for `ipPoolName`');
      }
      this.ipPoolName = ipPoolName;
    }
  }

  /**
   * Set ASM
   */
  setAsm(asm) {
    if (typeof asm !== 'undefined') {
      if (typeof asm !== 'object') {
        throw new Error('Object expected for `asm`');
      }
      this.asm = asm;
    }
  }

  /**
   * Set personalizations
   */
  setPersonalizations(personalizations) {
    if (typeof personalizations !== 'undefined') {
      if (!Array.isArray(personalizations)) {
        throw new Error('Array expected for `personalizations`');
      }
      this.personalizations = personalizations;
    }
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
  addTo(to, substitutions) {
    this.addPersonalization(new Personalization({to, substitutions}));
  }

  /**
   * Set content
   */
  setContent(content) {
    if (typeof content !== 'undefined') {
      if (!Array.isArray(content)) {
        throw new Error('Array expected for `content`');
      }
      this.content = content;
    }
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
    if (typeof text !== 'undefined') {
      if (typeof text !== 'string') {
        throw new Error('String expected for `text`');
      }
      this.addContent({
        value: text,
        type: 'text/plain',
      });
    }
  }

  /**
   * Add HTML content
   */
  addHtmlContent(html) {
    if (typeof html !== 'undefined') {
      if (typeof html !== 'string') {
        throw new Error('String expected for `html`');
      }
      this.addContent({
        value: html,
        type: 'text/html',
      });
    }
  }

  /**
   * Set attachments
   */
  setAttachments(attachments) {
    if (typeof attachments !== 'undefined') {
      if (!Array.isArray(attachments)) {
        throw new Error('Array expected for `attachments`');
      }
      this.attachments = attachments;
    }
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
    if (typeof headers !== 'undefined') {
      if (typeof headers !== 'object') {
        throw new Error('Object expected for `headers`');
      }
      this.headers = headers;
    }
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
    if (typeof sections !== 'undefined') {
      if (typeof sections !== 'object') {
        throw new Error('Object expected for `sections`');
      }
      this.sections = sections;
    }
  }

  /**
   * Set custom args
   */
  setCustomArgs(customArgs) {
    if (typeof customArgs !== 'undefined') {
      if (typeof customArgs !== 'object') {
        throw new Error('Object expected for `customArgs`');
      }
      this.customArgs = customArgs;
    }
  }

  /**
   * Set tracking settings
   */
  setTrackingSettings(settings) {
    if (typeof settings !== 'undefined') {
      if (typeof settings !== 'object') {
        throw new Error('Object expected for `trackingSettings`');
      }
      this.trackingSettings = settings;
    }
  }

  /**
   * Set mail settings
   */
  setMailSettings(settings) {
    if (typeof settings !== 'undefined') {
      if (typeof settings !== 'object') {
        throw new Error('Object expected for `mailSettings`');
      }
      this.mailSettings = settings;
    }
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
      content: this.content.map(content => content.toJSON()),
    };

    //Array properties
    if (Array.isArray(this.attachments) && this.attachments.length > 0) {
      json.attachments = this.attachments.map(att => att.toJSON());
    }
    if (Array.isArray(this.categories) && this.categories.length > 0) {
      json.categories = this.categories.filter(cat => cat !== '');
    }

    //Object properties
    if (Object.keys(this.headers).length > 0) {
      json.headers = this.headers;
    }
    if (Object.keys(this.mailSettings).length > 0) {
      json.mailSettings = this.mailSettings;
    }
    if (Object.keys(this.trackingSettings).length > 0) {
      json.trackingSettings = this.trackingSettings;
    }
    if (Object.keys(this.customArgs).length > 0) {
      json.customArgs = this.customArgs;
    }
    if (Object.keys(this.sections).length > 0) {
      json.sections = this.sections;
    }
    if (Object.keys(this.asm).length > 0) {
      json.asm = this.asm;
    }

    //Simple properties
    if (this.replyTo) {
      json.replyTo = this.replyTo;
    }
    if (this.sendAt) {
      json.sendAt = this.sendAt;
    }
    if (this.batchId) {
      json.batchId = this.batchId;
    }
    if (this.templateId) {
      json.templateId = this.templateId;
    }
    if (this.ipPoolName) {
      json.ipPoolName = this.ipPoolName;
    }

    //Return as snake case
    return toSnakeCase(json);
  }
}

//Export class
module.exports = Mail;
