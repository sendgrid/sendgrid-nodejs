'use strict';

/**
 * Dependencies
 */
const http = require('request');
const pkg = require('../../package.json');
const {
  helpers: {
    mergeData,
  },
  classes: {
    ResponseError,
    Mail,
  },
} = require('@sendgrid/helpers');

/**
 * Helper function
 */
const createMailRequest = (data) => {
  const mail = Mail.create(data);
  const mailRequest = {
    method: 'POST',
    url: '/v3/mail/send',
    body: mail.toJSON(),
  };
  return mailRequest;
};

/**
 * Sendgrid REST Client
 */
class Client {

  /**
   * Constructor
   */
  constructor() {

    //API key
    this.apiKey = '';

    //Default headers
    this.defaultHeaders = {
      'Accept': 'application/json',
      'User-agent': 'sendgrid/' + pkg.version + ';nodejs',
    };

    //Empty default request
    this.defaultRequest = {
      json: true,
      baseUrl: 'https://api.sendgrid.com/',
      url: '',
      method: 'GET',
      headers: {},
    };
  }

  /**
   * Set API key
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Set default header
   */
  setDefaultHeader(key, value) {
    this.defaultHeaders[key] = value;
    return this;
  }

  /**
   * Set default request
   */
  setDefaultRequest(key, value) {
    this.defaultRequest[key] = value;
    return this;
  }

  /**
   * Create headers for request
   */
  createHeaders(data) {

    //Merge data with default headers
    const headers = mergeData(this.defaultHeaders, data);

    //Add API key, but don't overwrite if header already set
    if (typeof headers.Authorization === 'undefined' && this.apiKey) {
      headers.Authorization = 'Bearer ' + this.apiKey;
    }

    //Return
    return headers;
  }

  /**
   * Create request
   */
  createRequest(data) {

    //Keep URL parameter consistent
    if (data.uri) {
      data.url = data.uri;
      delete data.uri;
    }

    //Merge data with empty request
    const request = mergeData(this.defaultRequest, data);

    //Add headers
    request.headers = this.createHeaders(request.headers);
    return request;
  }

  /**
   * Do a request
   */
  request(data, cb) {

    //Create request
    const request = this.createRequest(data);

    //Perform request
    const promise = new Promise((resolve, reject) => {
      http(request, (error, response, body) => {

        //Request error
        if (error) {
          return reject(error);
        }

        //Response error
        if (response.statusCode >= 400) {
          return reject(new ResponseError(response));
        }

        //Successful response
        resolve([response, body]);
      });
    });

    // Throw and error incase function not passed
    if (cb && typeof cb !== 'function') {
      throw new Error('Callback passed is not a function.');
    }

    //Execute callback if provided
    if (cb) {
      promise
        .then(result => cb(null, result))
        .catch(error => cb(error, null));
    }

    //Return promise
    return promise;
  }

  getWhiteLabels(username,
    domain,
    limit = 50,
    offset = 0,
    shouldExcludeSubuser = false,
    cb) {
    const request = {
      method: 'GET',
      url: 'v3/whitelabel/domains',
      qs: {
        exclude_subusers: shouldExcludeSubuser,
        limit,
        offset,
        username,
        domain,
      },
    };
    return this.request(request, cb);
  }

  createWhiteLabelDomain(domain,
      subdomain,
      emailTo,
      username,
      ips,
      automaticSecurity = false,
      customSPF = true,
      isDefault = true,
      cb) {
    const request = {
      method: 'POST',
      url: 'v3/whitelabel/domains',
      body: {
        domain,
        subdomain,
        username,
        ips,
        custom_spf: customSPF,
        default: isDefault,
        automatic_security: automaticSecurity,
      },
    };
    const promise = this.request(request, cb);
    if (emailTo) {
      promise.then(([response, body]) => {
        const msg = {
          to: emailTo,
          from: `${body.username}@${domain}`,
          subject: `DNS Details for ${subdomain}.${domain}`,
          text: 'DNS Details!',
          html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
          substitutionWrappers: ['{{', '}}'],
        };
        const mailRequest = createMailRequest(msg);
        this.request(mailRequest).catch(error => console.log(error));
        return Promise.resolve([response, body]);
      });
    }
    return promise;
  }

  createWhiteLabelIps(ip,
      domain,
      subdomain,
      emailTo,
      cb) {
    const request = {
      method: 'POST',
      url: 'v3/whitelabel/ips',
      body: {
        domain,
        subdomain,
        ip,
      },
    };
    const promise = this.request(request, cb);
    if (emailTo) {
      promise.then(([response, body]) => {
        const msg = {
          to: emailTo,
          from: `${subdomain}@${domain}`,
          subject: `DNS Details for ${subdomain}.${domain}`,
          text: 'DNS Details!',
          html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
          substitutionWrappers: ['{{', '}}'],
        };
        const mailRequest = createMailRequest(msg);
        this.request(mailRequest).catch(error => console.log(error));
        return Promise.resolve([response, body]);
      });
    }
    return promise;
  }

  createWhiteLabelLinks(domain,
      subdomain,
      emailTo,
      isDefault = true,
      cb) {
    const request = {
      method: 'POST',
      url: 'v3/whitelabel/links',
      body: {
        domain,
        subdomain,
        default: isDefault,
      },
    };
    const promise = this.request(request, cb);
    if (emailTo) {
      promise.then(([response, body]) => {
        const msg = {
          to: emailTo,
          from: `${subdomain}@${domain}`,
          subject: `DNS Details for ${subdomain}.${domain}`,
          text: 'DNS Details!',
          html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
          substitutionWrappers: ['{{', '}}'],
        };
        const mailRequest = createMailRequest(msg);
        this.request(mailRequest).catch(error => console.log(error));
        return Promise.resolve([response, body]);
      });
    }
    return promise;
  }
}

//Export class
module.exports = Client;
