var _ = require('underscore');

function SmtpapiHeaders() {
  this.to = [];
  this.sub = {};
  this.unique_args = {};
  this.category = [];
  this.filters = {};
  this.section = {};
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
  if (_.isArray(val)) {
    this.category = val;
  } else {
    this.category = [val];
  }
}

SmtpapiHeaders.prototype.addCategory = function(val) {
  if (_.isArray(val)) {
    this.category.concat(val);
  } else {
    this.category.push(val);
  }
}

SmtpapiHeaders.prototype.setSection = function(val){
  if (_.isObject(val)) {
    this.section = val;
  }
}

SmtpapiHeaders.prototype.addSection = function(val){
  if (_.isObject(val)) {
    _.extend(this.section, val);
  }
}

SmtpapiHeaders.prototype.setFilterSetting = function(filters) {
  this.filters = filters;
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
  var data = _.clone(this);
  _.each(data, function(v, k, list) {
    if (_.isEmpty(v)) {
      delete list[k];
    }
  });
  var json = JSON.stringify(data);
  return json.replace(/(["\]}])([,:])(["\[{])/, '$1$2 $3');
}

module.exports = SmtpapiHeaders;
