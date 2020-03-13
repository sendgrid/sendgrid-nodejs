'use strict';

class Request {
  constructor(opts) {
    opts = opts || {};
    this.ANY = '*';

    this.method = opts.method || this.ANY;
    this.url = opts.url || this.ANY;
    this.auth = opts.auth || this.ANY;
    this.params = opts.params || this.ANY;
    this.data = opts.data || this.ANY;
    this.headers = opts.headers || this.ANY;
  }
}

module.exports = Request;
