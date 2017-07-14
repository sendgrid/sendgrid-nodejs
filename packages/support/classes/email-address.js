'use strict';

/**
 * Email address class
 */
class EmailAddress {

	/**
	 * Constructor
	 */
  constructor(data) {

    //Construct from data
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * From data
   */
  fromData(data) {

    //String given
    if (typeof data === 'string') {
      const [name, email] = this.splitNameEmail(data);
      data = {name, email};
    }

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object or string for EmailAddress data');
    }

    //Extract name and email
    const {name, email} = data;

    //Set
    this.email = email;
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
      throw new Error('No data provided for EmailAddress.create()');
    }

    //Create instance
    return new EmailAddress(data);
  }
}

//Export class
module.exports = EmailAddress;
