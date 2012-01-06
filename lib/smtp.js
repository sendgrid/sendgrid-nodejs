var fs = require('fs'),
    nodemailer = require('nodemailer');

exports.Smtp = function(apiUser, apiKey) {
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
    var attachments = [];

    nodemailer.SMTP = {
        host: 'smtp.sendgrid.net',
        port: 465,
        use_authentication: true,
        ssl: true,
        user: apiUser,
        pass: apiKey,
        debug: true
    }
    
    var sender = sendgrid.getFromAddress();
    var headers = sendgrid.getHeaders();
    var xsmtpapi = sendgrid.getHeader().toJson();
    
    if(xsmtpapi != '{}') {
      headers['X-SMTPAPI'] = xsmtpapi;
    }
    
    if(sendgrid.getFromName()) {
      sender = "'" + sendgrid.getFromName() +  "' " + sendgrid.getFromAddress();
    }
    
    if(sendgrid.getReplyTo()) {
      headers['Reply-To'] = sendgrid.getReplyTo();
    }
    
    for(var key in files) {
      attachments.push({filename: key, contents: files[key]});
    }
    
    var options = {
            sender: sender,
            to: sendgrid.getToString(),
            subject: sendgrid.getSubject(),
            html: sendgrid.getHtml(),
            body: sendgrid.getText(),
            attachments: attachments,
            headers: headers
        };
        
    nodemailer.send_mail(
        options,
        // callback function
        function(error, success){
            callback(!success, error);
        }
    );    
  }
}
