function SmtpapiHeaders() {
  this.data = {};
}

SmtpapiHeaders.prototype.addTo = function(to) {
  if (!this.data['to']) {
    this.data['to'] = [];
  }
  if (typeof to == 'object') {
    this.data['to'] = this.data['to'].concat(to);
  } else {
    this.data['to'].push(to);
  }
}

SmtpapiHeaders.prototype.addSubVal = function(key, val) {
  if (!this.data['sub']) {
    this.data['sub'] = {};
  }
  if (typeof val == 'object') {
    this.data['sub'][key] = val;
  } else {
    this.data['sub'][key] = [val];
  }
}

SmtpapiHeaders.prototype.setUniqueArgs = function(val) {
  if (typeof val == 'object') {
    this.data['unique_args'] = val;
  }
}

SmtpapiHeaders.prototype.setCategory = function(val) {
  this.data['category'] = val;
}

SmtpapiHeaders.prototype.addFilterSetting = function(filter, setting, val) {
  if (!this.data['filters']) {
    this.data['filters'] = {};
  }

  if (!this.data['filters'][filter]) {
    this.data['filters'][filter] = {};
  }

  if (!this.data['filters'][filter]['settings']) {
    this.data['filters'][filter]['settings'] = {};
  }

  this.data['filters'][filter]['settings'][setting] = val;
}

SmtpapiHeaders.prototype.toJson = function() {
  var json = JSON.stringify(this.data);
  return json.replace(/(["\]}])([,:])(["\[{])/, '$1$2 $3');
}

module.exports = SmtpapiHeaders;
