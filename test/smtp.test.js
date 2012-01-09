var Smtp = require('../lib/smtp').Smtp;
var Sendgrid = require('../lib/sendgrid').Sendgrid;
var should = require('should');

describe('Smtp', function() {
    var sg;
    beforeEach(function() {
        var transport = new Smtp('isaac@sendgrid.com', 'testing');
        sg = new Sendgrid(transport);
    });

    it('should successfully send an email', function() {
        sg.addTo({'example3@example.com': 'Name 1', 'example4@example.com': 'name 4'});
        sg.addAttachment('logo.png', './test/assets/logoinvoice.png');
        sg.addAttachment('index.js', './test/assets/index.js');
        sg.setReplyTo('reply@sendgrid.com');
        sg.setFromName('from@sendgrid.com');
        sg.addHeader('x-test', 'from@sendgrid.com');

        sg.deliver({from_address:'from@example.com', to: null, subject:'subject 1', html:'<b>Html 1</b>',}, function(err, message) {
            if (err) should.fail('There was an error in the delivery: ' + err);
        });
    });
});
