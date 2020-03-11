'use strict';

var _ = require('lodash');

class Request {
  constructor(opts) {
    opts = opts || {};

    this.method = opts.method || Request.ANY;
    this.url = opts.url || Request.ANY;
    this.auth = opts.auth || Request.ANY;
    this.params = opts.params || Request.ANY;
    this.data = opts.data || Request.ANY;
    this.headers = opts.headers || Request.ANY;
    return this;
  }

  #attributeEqual(lhs, rhs) {
    if (lhs === Request.ANY || rhs === Request.ANY) {
      return true;
    }

    lhs = lhs || undefined;
    rhs = rhs || undefined;

    return _.isEqual(lhs, rhs);
  }

  isEqual(other) {
    return (#attributeEqual(this.method, other.method) &&
      #attributeEqual(this.url, other.url) &&
      #attributeEqual(this.auth, other.auth) &&
      #attributeEqual(this.params, other.params) &&
      #attributeEqual(this.data, other.data) &&
      #attributeEqual(this.headers, other.headers));
  }

  toString() {
    var auth = '';
    if (this.auth && this.auth !== Request.ANY) {
      auth = this.auth + ' ';
    }

    var params = '';
    if (this.params && this.params !== Request.ANY) {
      params = '?' + _.join(_.chain(_.keys(this.params))
        .map(function(key) { return key + '=' + this.params[key]; }.bind(this))
        .value(), '&');
    }

    var data = '';
    if (this.data && this.data !== Request.ANY) {
      if (this.method === 'GET') {
        data = '\n -G';
      }

      data = data + '\n' + _.join(
        _.map(this.data, function(value, key) {
          return ' -d ' + key + '=' + value;
        }), '\n');
    }

    var headers = '';
    if (this.headers && this.headers !== Request.ANY) {
      headers = '\n' + _.join(
        _.map(this.headers, function(value, key) {
          return ' -H ' + key + '='  + value;
        }), '\n');
    }

    return auth + this.method + ' ' + this.url + params + data + headers;
  }
}
Request.ANY = '*';

module.exports = Request;
