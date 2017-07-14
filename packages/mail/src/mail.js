
/**
 * Dependencies
 */
const client = require('@sendgrid/client');
const {Mail} = require('@sendgrid/support');

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

    //Send mail
    try {

      //Create Mail instance from data and get JSON body for request
      const mail = this.makeMail(data);
      const body = mail.toJSON();

      //Create request
      const request = {
        method: 'POST',
        url: '/v3/mail/send',
        body,
      };

      //Send
      return this.client.request(request, cb);
    }

    //Catch sync errors
    catch (error) {

      //Pass to callback if provided
      if (cb) {
        cb(error, null);
      }

      //Reject promise
      return Promise.reject(error);
    }
  }

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data, cb) {
    return this.send(data, true, cb);
  }

  /**
   * Helper to make a mail instance from given data
   */
  makeMail(data, isMultiple = false) {

    //Already a Mail instance
    if (data instanceof Mail) {
      return data;
    }

    //Create instance
    return new Mail(data, isMultiple);
  }
}

//Export class
module.exports = new MailService();
