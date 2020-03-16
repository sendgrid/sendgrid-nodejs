'use strict';

class Request {
  constructor(opts) {
    opts = opts || {};
    this.method = opts.method;
    this.url = opts.url;
    this.auth = opts.auth;
    this.params = opts.params;
    this.data = opts.data;
    this.headers = opts.headers;
  }
}

module.exports = Request;
