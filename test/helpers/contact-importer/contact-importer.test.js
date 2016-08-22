var ContactImporter = require('../../../lib/helpers/contact-importer/contact-importer.js')
var sendgrid = require('../../../')

var chai = require('chai')
var sinon = require('sinon')

chai.should()
var expect = chai.expect
chai.use(require('sinon-chai'))

require('mocha-sinon')

describe.only('test_contact_importer', function() {
  beforeEach(function() {
    // Create a new SendGrid instance.
    var API_KEY = process.env.API_KEY
    var sg = sendgrid(API_KEY)

    // Create a new importer with a batch size of 2.
    this.contactImporter = new ContactImporter(sg, {
      batchSize: 2,
    })
    // this.spy = sinon.spy(ContactImporter.prototype, '_sendBatch')
    this.sinon.spy(ContactImporter.prototype, '_sendBatch')

    // Generate some test data.
    var data = []
    for (i = 0; i < 5; i++) {
      var item = {
        email: 'example' + i + '@example.com',
        first_name: 'Test',
        last_name: 'User'
      }
      // Lets make the first user produce an error.
      if (i === 1) {
        item.invalid_field= 'some value'
      }
      data.push(item)
    }
    this.contactImporter.push(data)
  })

  it('test_contact_importer sends items in batches', function(done) {
    var self = this
    this.timeout(30000)
    this.contactImporter.on('success', function(result, batch) {
      console.log('SUCCESS result', result)
      console.log('SUCCESS batch', batch)
    })
    this.contactImporter.on('error', function(error, batch) {
      console.log('SUCCESS error', error)
      console.log('SUCCESS batch', batch)
    })
    this.contactImporter.on('drain', function() {
      expect(self.contactImporter._sendBatch).to.have.callCount(3)
      done()
    })
  })
})
