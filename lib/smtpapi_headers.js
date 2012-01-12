var _ = require('underscore');

function SmtpapiHeaders() {
  this.to = [];
  this.sub = {};
  this.unique_args = {};
  this.category = [];
  this.filters = {};
}

SmtpapiHeaders.prototype.addTo = function(to) {
  if (_.isArray(to)) {
    this.to = this.to.concat(to);
  } else {
    this.to.push(to);
  }
}

SmtpapiHeaders.prototype.addSubVal = function(key, val) {
  if (_.isArray(val)) {
    this.sub[key] = val;
  } else {
    this.sub[key] = [val];
  }
}

SmtpapiHeaders.prototype.setUniqueArgs = function(val) {
  if (_.isObject(val)) {
    this.unique_args = val;
  }
}

SmtpapiHeaders.prototype.addUniqueArgs = function(val) {
  if (_.isObject(val)) {
    _.extend(this.unique_args, val);
  }
}

SmtpapiHeaders.prototype.setCategory = function(val) {
  this.category = val;
}

SmtpapiHeaders.prototype.addCategory = function(val) {
  if (_.isArray(val)) {
    this.category.concat(val);
  } else {
    this.category.push(val);
  }
}

SmtpapiHeaders.prototype.addFilterSetting = function(filter, setting, val) {
  if (!this.filters[filter]) {
    this.filters[filter] = {};
  }

  if (!this.filters[filter]['settings']) {
    this.filters[filter]['settings'] = {};
  }

  this.filters[filter]['settings'][setting] = val;
}

SmtpapiHeaders.prototype.toJson = function() {
  var json = JSON.stringify(this);
  return json.replace(/(["\]}])([,:])(["\[{])/, '$1$2 $3');
}

module.exports = SmtpapiHeaders;
