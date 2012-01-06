var assert = require('assert'),
    sendgrid = require('../lib/sendgrid');
    
var apiUser = 'isaac@sendgrid.com';
var apiKey = 'testing';
    

exports.main = function() {
  var transport = new sendgrid.Http(apiUser, apiKey);
  var sg = new sendgrid.Sendgrid(transport);
  
  sg.addTo('example@example.com');
  assert.ok(JSON.stringify(sg.getTo()) == '["example@example.com"]');
  
  sg.addTo(['example1@example.com', 'example2@example.com']);
  assert.ok(JSON.stringify(sg.getTo()) == '["example@example.com","example1@example.com","example2@example.com"]');
  
  sg.addTo({'example3@example.com': 'name 3', 'example4@example.com': 'name 4'});
  assert.ok(JSON.stringify(sg.getTo()) == '["example@example.com","example1@example.com","example2@example.com","example3@example.com","example4@example.com"]');

  assert.throws(function(){ sg.enableBcc({test: 1}) }, /Missing bcc email/);
  assert.throws(function(){ sg.enableGravatar({test: 1}) }, /Unknown app setting test/);
  
  sg.enableBcc({email: 'example@example.com'});
  assert.equal(sg.getHeader().toJson(), '{"filters": {"Bcc":{"settings":{"email":"example@example.com","enable":1}}}}');
  
  sg.disableBcc();
  assert.equal(sg.getHeader().toJson(), '{"filters": {"Bcc":{"settings":{"email":"example@example.com","enable":0}}}}');

  var transport = new sendgrid.Smtp(apiUser, apiKey);
  sg = new sendgrid.Sendgrid(transport);
  sg.addTo({'example3@example.com': 'Name 1', 'example4@example.com': 'name 4'});
  sg.addAttachment('logo.png', './assets/logoinvoice.png');
  sg.addAttachment('index.js', './assets/index.js');
  sg.setReplyTo('reply@sendgrid.com');
  sg.setFromName('from@sendgrid.com');
  sg.addHeader('x-test', 'from@sendgrid.com');
  
  
  sg.deliver({from_address:'from@example.com', to:null, subject:'subject 1', html:'<b>Html 1</b>',}, function(err, message){
    assert.ok(!err);
  });

  var transport = new sendgrid.Http(apiUser, apiKey);
  sg = new sendgrid.Sendgrid(transport);
  sg.addTo({'example3@example.com': 'Name 1', 'example4@example.com': 'name 4'});
  sg.addAttachment('logo.png', './assets/logoinvoice.png');
  sg.addAttachment('index.js', './assets/index.js');
  sg.setReplyTo('reply@sendgrid.com');
  sg.setFromName('from@sendgrid.com');
  sg.addHeader('x-test', 'from@sendgrid.com');
  
  
  sg.deliver({from_address:'from@example.com', to:null, subject:'subject 1', html:'<b>Html 1</b>',}, function(err, message){
    assert.ok(!err);
  });

}

exports.main();