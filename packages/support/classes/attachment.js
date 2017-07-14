'use strict';

/**
 * Dependencies
 */
const toCamelCase = require('../helpers/to-camel-case');
const toSnakeCase = require('../helpers/to-snake-case');
const deepClone = require('../helpers/deep-clone');

/**
 * Attachment class
 */
class Attachment {

	/**
	 * Constructor
	 */
  constructor(data) {

    //Create from data
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * From data
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
    const {content, filename, type, disposition, contentId} = data;

    //Set data
    this.setContent(content);
    this.setFilename(filename);
    this.setType(type);
    this.setDisposition(disposition);
    this.setContentId(contentId);
  }

  /**
   * Set content
   */
  setContent(content) {
    if (typeof content === 'undefined') {
      return;
    }
    if (typeof content !== 'string') {
      throw new Error('String expected for `content`');
    }
    this.content = content;
  }

  /**
   * Set filename
   */
  setFilename(filename) {
    if (typeof filename === 'undefined') {
      return;
    }
    if (filename && typeof filename !== 'string') {
      throw new Error('String expected for `filename`');
    }
    this.filename = filename;
  }

  /**
   * Set type
   */
  setType(type) {
    if (typeof type === 'undefined') {
      return;
    }
    if (typeof type !== 'string') {
      throw new Error('String expected for `type`');
    }
    this.type = type;
  }

  /**
   * Set disposition
   */
  setDisposition(disposition) {
    if (typeof disposition === 'undefined') {
      return;
    }
    if (typeof disposition !== 'string') {
      throw new Error('String expected for `disposition`');
    }
    this.disposition = disposition;
  }

  /**
   * Set content ID
   */
  setContentId(contentId) {
    if (typeof contentId === 'undefined') {
      return;
    }
    if (typeof contentId !== 'string') {
      throw new Error('String expected for `contentId`');
    }
    this.contentId = contentId;
  }

	/**
	 * To JSON
	 */
  toJSON() {

    //Extract properties from self
    const {content, filename, type, disposition, contentId} = this;

    //Initialize with mandatory properties
    const json = {content, filename};

    //Add whatever else we have
    if (typeof type !== 'undefined') {
      json.type = type;
    }
    if (typeof disposition !== 'undefined') {
      json.disposition = disposition;
    }
    if (typeof contentId !== 'undefined') {
      json.contentId = contentId;
    }

    //Return
    return toSnakeCase(json);
  }
}

//Export class
module.exports = Attachment;
