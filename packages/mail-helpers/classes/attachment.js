'use strict';

/**
 * Attachment class
 */
class Attachment {

	/**
	 * Constructor
	 */
  constructor(content, filename, type = '', disposition = '', contentId = '') {
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
    if (content && typeof content !== 'string') {
      throw new Error('String expected for `content`');
    }
    this.content = content;
  }

  /**
   * Set filename
   */
  setFilename(filename) {
    if (filename && typeof filename !== 'string') {
      throw new Error('String expected for `filename`');
    }
    this.filename = filename;
  }

  /**
   * Set type
   */
  setType(type) {
    if (type && typeof type !== 'string') {
      throw new Error('String expected for `type`');
    }
    this.type = type;
  }

  /**
   * Set disposition
   */
  setDisposition(disposition) {
    if (disposition && typeof disposition !== 'string') {
      throw new Error('String expected for `disposition`');
    }
    this.disposition = disposition;
  }

  /**
   * Set content ID
   */
  setContentId(contentId) {
    if (contentId && typeof contentId !== 'string') {
      throw new Error('String expected for `contentId`');
    }
    this.contentId = contentId;
  }

	/**
	 * To JSON
	 */
  toJSON() {

    //Initialize with mandatory values
    const json = {
      content: this.content,
      filename: this.filename,
    };

    //Add whatever else we have
    if (this.type) {
      json.type = this.type;
    }
    if (this.disposition) {
      json.disposition = this.disposition;
    }
    if (this.contentId) {
      json.content_id = this.contentId;
    }

    //Return
    return json;
  }
}

//Export class
module.exports = Attachment;
