'use strict';

var _ = require('lodash');

class Request {
  constructor(opts) {
    opts = opts || {};
    this.ANY = '*'

    this.method = opts.method || this.ANY;
    this.url = opts.url || this.ANY;
    this.auth = opts.auth || this.ANY;
    this.params = opts.params || this.ANY;
    this.data = opts.data || this.ANY;
    this.headers = opts.headers || this.ANY;
  }

  attributeEqual(lhs, rhs) {
    if (lhs === this.ANY || rhs === this.ANY) {
      return true;
    }

    lhs = lhs || undefined;
    rhs = rhs || undefined;

    return _.isEqual(lhs, rhs);
  }

  isEqual(other) {
    return (attributeEqual(this.method, other.method) &&
      attributeEqual(this.url, other.url) &&
      attributeEqual(this.auth, other.auth) &&
      attributeEqual(this.params, other.params) &&
      attributeEqual(this.data, other.data) &&
      attributeEqual(this.headers, other.headers));
  }

  toString() {
    var auth = '';
    if (this.auth && this.auth !== this.ANY) {
      auth = this.auth + ' ';
    }

    var params = '';
    if (this.params && this.params !== this.ANY) {
      params = '?' + _.join(_.chain(_.keys(this.params))
        .map(function(key) { return key + '=' + this.params[key]; }.bind(this))
        .value(), '&');
    }

    var data = '';
    if (this.data && this.data !== this.ANY) {
      if (this.method === 'GET') {
        data = '\n -G';
      }

      data = data + '\n' + _.join(
        _.map(this.data, function(value, key) {
          return ' -d ' + key + '=' + value;
        }), '\n');
    }

    var headers = '';
    if (this.headers && this.headers !== this.ANY) {
      headers = '\n' + _.join(
        _.map(this.headers, function(value, key) {
          return ' -H ' + key + '='  + value;
        }), '\n');
    }

    return auth + this.method + ' ' + this.url + params + data + headers;
  }
}

module.exports = Request;
