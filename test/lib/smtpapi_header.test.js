var SmtpapiHeaders = require('../../lib/smtpapi_headers');

describe('Smtpapiheader', function() {
  var header;
  beforeEach(function() {
    header = new SmtpapiHeaders();
  });

  it('should allow multiple to addresses', function() {
    header.addTo('kyle.partridge@sendgrid.com');
    header.addTo('david.tomberlin@sendgrid.com');
    header.data.to.should.eql(['kyle.partridge@sendgrid.com', 'david.tomberlin@sendgrid.com']);
  });

  describe('unique_args', function() {
    var unique_args = { foo: 'bar', apple: 'sauce' };
    it('should allow setting unique args', function() {
      header.setUniqueArgs(unique_args);
      header.data.unique_args.should.eql(unique_args);
    });

    it('should allow adding unique_args one at a time', function() {
      for (var key in unique_args) {
        var args = {};
        args[key] = unique_args[key];
        header.addUniqueArgs(args);
      }
      header.data.unique_args.should.eql(unique_args);
    });
  });


  describe('categories', function() {
    var categories = ['azure', 'dreams'];

    it('should allow setting a single category', function() {
      header.setCategory(categories[0]);
      header.data.category.should.equal(categories[0]);
    });

    it('should allow adding categories one at a time', function() {
      header.addCategory(categories[0]);
      header.addCategory(categories[1]);
      header.data.category.should.eql(categories);
    });

    it('should allow setting categories', function() {
      var categories = ['azure', 'dreams'];
      header.setCategory(categories);
      header.data.category.should.eql(categories);
    });
  });
});
