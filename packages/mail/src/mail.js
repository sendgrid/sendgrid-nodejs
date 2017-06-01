
/**
 * Dependencies
 */
const client = require('@sendgrid/client');
const {Mail} = require('@sendgrid/mail-helpers');

/**
 * Mail service class
 */
class MailService {

	/**
	 * Constructor
	 */
  constructor() {
    this.client = client;
  }

  /**
   * API key pass through for convenience
   */
  setApiKey(apiKey) {
    this.client.setApiKey(apiKey);
  }

  /**
   * Send email
   */
  send(data, isMultiple = false, cb) {

    //Callback as second parameter
    if (typeof isMultiple === 'function') {
      cb = isMultiple;
      isMultiple = false;
    }

    //Array? Send in parallel
    if (Array.isArray(data)) {

      //Create promise
      const promise = Promise.all(data.map(item => {
        return this.send(item, isMultiple);
      }));

      //Execute callback if provided
      if (cb) {
        promise
          .then(result => cb(null, result))
          .catch(error => cb(error, null));
      }

      //Return promise
      return promise;
    }

    //Create Mail instance(s) from given data and get JSON body for request
    const mail = Mail.create(data, isMultiple);
    const body = mail.toJSON();

    //Create request
    const request = {
      method: 'POST',
      path: '/v3/mail/send',
      body,
    };

    //Send
    return this.client.request(request, cb);
  }

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data, cb) {
    return this.send(data, true, cb);
  }
}

//Export class
module.exports = new MailService();
