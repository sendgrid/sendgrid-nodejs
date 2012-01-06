var https = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    querystring = require("querystring");

exports.Http = function(apiUser, apiKey) {
  this.username = apiUser;
  this.password = apiKey;

  this.deliver = function(sendgrid, callback) {
    var attachments = sendgrid.getAttachments();
    var attachments_count = attachments.length;
    var files = {};
    var transport = this;

    var process_attach = function(attach){
      fs.readFile(attach.file, function(err, data){
        attachments_count--;
        if(err) {
          return callback(true, "File could not be opened");
        }
        files[attach['name']] = data;
        if(attachments_count == 0) {
          transport.send_request(sendgrid, files, callback);
        }
      });
    }

    if(attachments_count) {
      for(var key in attachments) {
        process_attach(attachments[key]);
      }
    }else {
      this.send_request(sendgrid, files, callback);
    }
  }


  this.send_request = function(sendgrid, files, callback) {
    var data = {
                  'api_user': apiUser,
                  'api_key': apiKey,
                  'to': sendgrid.getTo(),
                  'subject': sendgrid.getSubject(),
                  'from': sendgrid.getFromAddress(),
    }

    if(sendgrid.getDate()) {
      data['date'] = sendgrid.getDate();
    }
    if(sendgrid.getHeaders()) {
      data['headers'] = JSON.stringify(sendgrid.getHeaders());
    }

    var xsmtpapi = sendgrid.getHeader().toJson();
    if(xsmtpapi != '{}') {
      data['x-smtpapi'] = xsmtpapi;
    }

    var optional_params = {
                           'toname': sendgrid.getToName(),
                           'text': sendgrid.getText(),
                           'html': sendgrid.getHtml(),
                           'bcc': sendgrid.getBCC(),
                           'fromname': sendgrid.getFromName(),
                           'replyto': sendgrid.getReplyTo(),
                           //'files': self.get_files(),
    }

    for(key in optional_params) {
      if(optional_params[key].length) {
        data[key] = optional_params[key]
      }
    }

    var headers = {};
    var boundary = Math.random();
    var body = this.encodeBody(boundary, data);
    var file_parts = [];
    var length = body.length;

    for(var key in files) {
      var type = mime.lookup(key);
      var value = this.encodeFilePart(boundary, type, 'files['+key+']', key);
      file_parts.push(value);
      length += value.length;
      file_parts.push(files[key]);
      length += files[key].length;
      value = "\r\n";
      file_parts.push(value);
      length += value.length;
    }
    if(file_parts.length) {
      value = "--" + boundary + '--';
      file_parts.push(value);
      length += value.length;
    }

    headers['Content-Length'] = length;
    headers['Content-Type'] = 'multipart/form-data; boundary=' + boundary;
    headers['Accept'] = '*/*';

    var options = {
      host: "sendgrid.com",
      port: 80,
      path: encodeURI('/api/mail.send.json'),
      method: "POST",
      headers: headers,
    };

    var req = https.request(options, function apiRequest(res) {
      //Gather response
      var response = '';
      res.on('data', function apiResponse(d) {
        response += d.toString();
      });

      res.on('end', function endResponse() {
        res = JSON.parse(response);
        if(res.message == 'success') {
          return callback(false, 'success');
        }else {
          return callback(true, res.errors);
        }
      });
    });
    req.write(body);

    for(var i in file_parts) {
      req.write(file_parts[i]);
    }

    req.on('error', function reqError(e) {
      return callback(true, 'Problem with request: ' + e);
    });

    req.end();
  }


  this.encodeFieldPart = function (boundary, name, value) {
      var return_part = "--" + boundary + "\r\n";
      return_part += "Content-Disposition: form-data; name=\"" + name + "\"\r\n\r\n";
      return_part += value + "\r\n";
      return return_part;
  }

  this.encodeFilePart = function (boundary, type, name, filename) {
      var return_part = "--" + boundary + "\r\n";
      return_part += "Content-Disposition: form-data; name=\"" + name + "\"; filename=\"" + filename + "\"\r\n";
      return_part += "Content-Type: " + type + "\r\n\r\n";
      return return_part;
  }

  this.encodeBody = function(boundary, data) {
    var body = '';
    for(var key in data) {
      var value = data[key];
      if(typeof value == 'object') {
        for(var subkey in value) {
          body += this.encodeFieldPart(boundary, key+"[]", value[subkey]);
        }
      }else {
        body += this.encodeFieldPart(boundary, key, value);
      }
    }
    return body;
  }

}
