'use strict';

/**
 * Email address class
 */
class EmailAddress {

	/**
	 * Constructor
	 */
  construct(email, name = '') {
    this.setEmail(email);
    this.setName(name);
  }

  /**
   * Set email
   */
  setEmail(email) {
    if (email && typeof email !== 'string') {
      throw new Error('String expected for `email`');
    }
    this.email = email;
  }

  /**
   * Set name
   */
  setName(name) {
    if (name && typeof name !== 'string') {
      throw new Error('String expected for `name`');
    }
    this.name = name;
  }

	/**
	 * To JSON
	 */
  toJSON() {

    //Initialize with mandatory values
    const json = {
      email: this.email,
    };

    //Add name if present
    if (this.name) {
      json.name = this.name;
    }

    //Return
    return json;
  }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Split name and email address from string
   */
  static splitNameEmail(str) {

    //If no email bracket present, return as is
    if (str.indexOf('<') === -1) {
      return ['', str];
    }

    //Split into name and email
    let [name, email] = str.split('<');

    //Trim and fix up
    name = name.trim();
    email = email.replace('>', '').trim();

    //Return as array
    return [name, email];
  }

  /**
   * Create an EmailAddress instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data.map(item => this.create(item));
    }

    //Already instance of EmailAddress class?
    if (data instanceof EmailAddress) {
      return data;
    }

    //Nothing given?
    if (!data) {
      throw new Error('No data provided for EmailAddress');
    }

    //Extract name and email if string given
    if (typeof data === 'string') {
      const [name, email] = this.splitNameEmail(data);
      data = {name, email};
    }

    //Check if object
    if (typeof data !== 'object') {
      throw new Error('Invalid data provided for EmailAddress');
    }

    //Extract name and email
    const {name, email} = data;

    //Create instance
    return new EmailAddress(email, name);
  }
}

//Export class
module.exports = EmailAddress;
