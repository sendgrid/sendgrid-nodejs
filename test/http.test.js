var Sendgrid = require('../lib/sendgrid').Sendgrid;
var Http = require('../lib/http').Http;
var should = require('should');

describe('Sendgrid', function() {
    var transport;
    var sg;

    beforeEach(function() {
        transport = new Http('isaac@sendgrid.com', 'testing');
        sg        = new Sendgrid(transport);
    });

    it('should', function() {
        transport.username.should.equal('isaac@sendgrid.com');
        transport.password.should.equal('testing');
    });

    it('should store the to addresses', function() {
        sg.addTo('example@example.com')
        sg.getTo().should.eql(["example@example.com"]);
    });

    it('should allow multiple to addresses', function() {
        sg.addTo(['example1@example.com', 'example2@example.com']);
        sg.getTo().should.eql(["example1@example.com","example2@example.com"]);
    });

    it('should allow for names along with emails', function() {
        sg.addTo({'example3@example.com': 'name 3', 'example4@example.com': 'name 4'});
        sg.getTo().should.eql(["example3@example.com","example4@example.com"]);
        sg.getToName().should.eql(['name 3', 'name 4']);
    });

    it('should throw an exception if an app/filter setting is not available', function() {
        try {
            sg.enableGravatar({test: 1});
            should.fail('Should have thrown an exception')
        } catch(e) {
            should.ok('Unknown app setting test');
        }
    });

    it('should throw an exception when bcc is enabled and the bcc email is missing', function() {
        try {
            sg.enableBcc({test: 1});
            should.fail('Should have thrown an exception')
        } catch(e) {
            should.ok('Missing BCC Email');
        }
    });

    it('should allow bcc to work if there is a BCC email present', function() {
        sg.enableBcc({email: 'example@example.com'});
        sg.getHeader().toJson().should.equal('{"filters": {"Bcc":{"settings":{"email":"example@example.com","enable":1}}}}');
    });

    it('should disable bcc when after previously enabling it, but keep the email saved in the data', function() {
        sg.enableBcc({email: 'example@example.com'});
        sg.disableBcc();
        sg.getHeader().toJson().should.equal('{"filters": {"Bcc":{"settings":{"email":"example@example.com","enable":0}}}}');
    });

    it('should be able to send emails with attachments', function() {
        sg.addTo({'example3@example.com': 'Name 1', 'example4@example.com': 'name 4'});
        sg.addAttachment('logo.png', './test/assets/logoinvoice.png');
        sg.addAttachment('index.js', './test/assets/index.js');
        sg.setReplyTo('reply@sendgrid.com');
        sg.setFromName('from@sendgrid.com');
        sg.addHeader('x-test', 'from@sendgrid.com');


        sg.deliver({from_address:'from@example.com', to: null, subject:'subject 1', html:'<b>Html 1</b>',}, function(err, message){
            if (err) should.fail('There was an error in the delivery: ' + err);
        });
    });
});
