// Copyright SendGrid, Inc.
// http://www.Sendgrid.com
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Description
 *
 * @param {Object} from Pair of name and email address(es)
 * @param {Object} to Pair of name and email address(es)
 * @param {Array} cc Email address(es)
 * @param {Array} bcc Email address(es)
 * @param {String} subject Subject of the email
 * @param {Date} date Must be a valid RFC 2822 formatted date, http://www.faqs.org/rfcs/rfc2822
 * @param {Object} headers A collection of key/value pairs in JSON format. 
 * Each key represents a header name and the value the header value. 
 * Ex: {"X-Accept-Language": "en", "X-Mailer": "MyApp"}
 * @param {String} html HTML body
 * @param {String} text Text body
 * @param {Object} transport - transport object
 */
var path = require('path'),
    header = require('./header');

exports.Http = require('./http').Http;
exports.Smtp = require('./smtp').Smtp;

exports.Sendgrid = function(transport) {
  this.from_address = '';
  this.to = [];
  this.to_name = [];
  this.subject = '';
  this.date = null;
  this.text = '';
  this.html = '';
  this.cc = [];
  this.bcc = [];
  this.headers = {};
  this.header = new header.Header;
  this.attachments = [];
  

  this.addTo = function(recipients) {
    if(typeof recipients == 'string') {
      this.to.push(recipients);
    }else if(Array.isArray(recipients)) {
      this.to = this.to.concat(recipients);
    }else {
      for(var firstKey in recipients) break;
      if(typeof recipients[firstKey] == 'string') {
        for(var email in recipients){
          this.to.push(email);
          this.to_name.push(recipients[email]);
        }
      }else {
        //handle case with subvals like: {
        //        'example1@example.com': {'name': 'Name 1', 'code': 'Code 1'},
        //        'example2@example.com': {'name': 'Name 2', 'code': 'Code 2'},
        //    }
        var subvals = {};
        var to = [];
        for(var email in recipients) {
          to.push(email);
          for(var subval in recipients[email]) {
            if(!subvals[subval]) {
              subvals[subval] = [];
            }
            subvals[subval].push(recipients[email][subval]);
          }
          
          for(var subval in subvals) {
            if(subvals[subval].length != to.length) {
              this.header = new header.Header;
              throw "Sub values count should be equal to recipients count";
            }
            this.header.addSubVal(subval, subvals[subval]);
          }
          
          this.header.addTo(to);
          this.to = [transport.username];
        }
        
      }
    }
  }


  this.getTo = function() {
    return this.to;
  }
  

  this.getToString = function() {
    var to = '';
    for(var key in this.to) {
      to += this.to[key] + ',';
    }
    return to;
  }
  

  this.setSubject = function(subject) {
    this.subject = subject;
  }


  this.getSubject = function() {
    return this.subject;
  }
  

  this.getFromAddress = function() {
    return this.from_address;
  }
  

  this.setFromAddress = function(value) {
    this.from_address = value;
  }
  

  this.getFromName = function() {
    return this.from_name;
  }
  

  this.setFromName = function(value) {
    this.from_name = value;
  }
  

  this.getReplyTo = function() {
    return this.reply_to;
  }
  

  this.setReplyTo = function(value) {
    this.reply_to = value;
  }
  

  this.getHeader = function() {
    return this.header;
  }


  this.getHeaders = function() {
    return this.headers;
  }
  

  this.setHeaders = function(value) {
    this.headers = value;
  }


  this.addHeader = function(header, value) {
    this.headers[header] = value;
  }


  this.getDate = function() {
    return this.date;
  }
  

  this.setDate = function(value) {
    this.date = value;
  }
  

  this.getText = function() {
    return this.text;
  }
  

  this.setText = function(value) {
    this.text = value;
  }
  

  this.getHtml = function() {
    return this.html;
  }
  

  this.setHtml = function(value) {
    this.html = value;
  }


  this.getToName = function() {
    return this.to_name;
  }
  

  this.setToName = function(value) {
    this.to_name = value;
  }


  this.addBCC = function(recipients) {
    if(typeof recipients == 'string') {
      this.bcc.push(recipients);
    }else if(Array.isArray(recipients)) {
      this.bcc = this.bcc.concat(recipients);
    }    
  }


  this.getBCC = function(recipients) {
    return this.bcc;
  }


  this.addAttachment = function(name, file, cid) {
    if(file.length < 65535 && !path.existsSync(file)) {
      throw "File don't exist.";
    }
    this.attachments.push({'name': name, 'file': file, 'cid': cid});
  }


  this.getAttachments = function() {
    return this.attachments;
  }
  
  
  this.setCategory = function(category) {
    this.header.setCategory(category);
  }
  

  this.setUniqueArgs = function(val) {
    this.header.setUniqueArgs(val);
  }
  
  
  this.addFilterSetting = function(filter, setting, val) {
    this.header.addFilterSetting(filter, setting, val);
  }


  this.deliver = function(options, callback) {
    if(options.from_address) {
      this.from_address = options.from_address;
    }
    
    if(options.to) {
      this.to = [];
      this.to_name = [];
      this.addTo(options.to);
    }
    
    if(options.subject) {
      this.subject = options.subject;
    }
    
    if(options.html) {
      this.html = options.html;
    }
    
    if(options.text) {
      this.text = options.text;
    }

    if(options.cc) {
      this.cc = [];
      this.addCC(options.cc);
    }

    if(options.bcc) {
      this.bcc = [];
      this.addBCC(options.bcc);
    }

    if(options.headers) {
      this.setHeaders(options.headers);
    }
    
    transport.deliver(this, callback);
  }
  
  
  //apps list and settings
  var RE_TEXT = /<\%\s*\%>/;
  var RE_HTML = /<\%\s*[^\s]+\s*\%>/;
  
  var apps = { 'Gravatar': { filter: 'gravatar' },
                     'OpenTracking': { 'filter': 'opentrack' },
                     'ClickTracking': { 'filter': 'clicktrack',
                                          'settings': {
                                            'text': {
                                              'setting': 'enable_text'
                                            }
                                          }
                     },
                     'SpamCheck': { 'filter': 'spamcheck',
                                      'settings': {
                                        'score': {
                                          'setting': 'maxscore',
                                        },
                                        'url': {
                                          'setting': 'url'
                                        }
                                      }
                     },
                     'Unsubscribe': {
                       'filter': 'subscriptiontrack',
                       'settings': {
                         'text': {
                           'setting': 'text/plain',
                           'validation': function(x){ if(!RE_TEXT.test(x)) throw 'Missing substitution tag in text'; }
                         },
                         'html': {
                           'setting': 'text/html',
                           'validation': function(x){ if(!RE_HTML.test(x)) throw 'Missing substitution tag in html'; }
                         },
                         'replace': {
                           'setting': 'replace',
                         },
                       },
                     },
                     'Footer': {
                       'filter': 'footer',
                       'settings': {
                         'text': { 'setting': 'text/plain' },
                         'html': { 'setting': 'text/html' },
                       },
                     },
                     'GoogleAnalytics': {
                       'filter': 'ganalytics',
                       'settings': {
                         'source': { 'setting': 'utm_source' },
                         'medium': { 'setting': 'utm_medium' },
                         'term': { 'setting': 'utm_term' },
                         'content': { 'setting': 'utm_content' },
                         'campaign': { 'setting': 'utm_campaign' },
                       },
                     },
                     'DomainKeys': {
                       'filter': 'domainkeys',
                       'settings': {
                         'domain': { 'setting': 'domain' },
                         'sender': { 'setting': 'sender' },
                       },
                     },
                     'Template': {
                       'filter': 'template',
                       'validation': function(x){ if(!x['html']) throw 'Missing html template'; },
                       'settings': {
                         'html': {
                           'setting': 'text/html',
                           'validation': function(x){ if(!RE_TEXT.test(x)) throw 'Missing body substitution tag in template'; }
                         },
                       },
                     },
                     'Twitter': {
                       'filter': 'twitter',
                       'validation': function(x){ if(!x['username'] || !x['password']) throw 'Missing twitter username/password'; },
                       'settings': {
                         'username': { 'setting': 'username' },
                         'password': { 'setting': 'password' },
                       },
                     },
                     'Bcc': {
                       'filter': 'bcc',
                       'validation': function(x){ if(!x['email']) throw 'Missing bcc email'; },
                       'settings': {
                         'email': { 'setting': 'email' },
                       },
                     },
                     'BypassListManagement': {
                       'filter': 'bypass_list_management',
                     },
  
      }

  
  this.generateFilterFunctions = function() {
    var self = this;
    
    var enableFilter = function(name, params) {
      var required_params = apps[name].settings || {}; 
      
      //validate parameters
      if(apps[name].validation) {
        apps[name].validation(params);
      }
      
      for(var param in params) {
        if(!required_params[param]) {
          throw "Unknown app setting " + param;
        }
        
        //check per-argument validation 
        if(required_params[param].validation) {
          required_params[param].validation(params[param]);
        }
      }
          
      params['enable'] = 1;
      for(var param in params) {
        self.header.addFilterSetting(name, param, params[param]);
      }
    }

    var disableFilter = function(name) {
      self.header.addFilterSetting(name, 'enable', 0);
    }

    var _enableFilter = function(name) {
      return function(params){
        enableFilter(name, params);
      };
    }

    var _disableFilter = function(name) {
      return function(){
        disableFilter(name);
      };
    }
    
    for(var app in apps) {
      this['enable' + app] = _enableFilter(app);
      this['disable' + app] = _disableFilter(app);
    }
  }

  this.generateFilterFunctions();
};