'use strict';

/**
 * Content class
 */
class Content {

	/**
	 * Constructor
	 */
  constructor(value = '', type = 'text/html') {
    this.setValue(value);
    this.setType(type);
  }

  /**
   * Set value
   */
  setValue(value) {
    if (typeof value !== 'string') {
      throw new Error('String expected for `value`');
    }
    this.value = value;
  }

  /**
   * Set content
   */
  setType(type) {
    if (typeof type !== 'string') {
      throw new Error('String expected for `type`');
    }
    this.type = type;
  }

	/**
	 * To JSON
	 */
  toJSON() {
    return {
      type: this.type,
      value: this.value,
    };
  }
}

//Export class
module.exports = Content;
