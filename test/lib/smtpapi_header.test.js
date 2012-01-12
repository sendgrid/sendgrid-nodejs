var SmtpapiHeaders = require('../../lib/smtpapi_headers');

describe('SmtpapiHeader', function() {
  var header;
  beforeEach(function() {
    header = new SmtpapiHeaders();
  });

  it('should allow multiple to addresses', function() {
    header.addTo('kyle.partridge@sendgrid.com');
    header.to.should.eql(['kyle.partridge@sendgrid.com']);
    header.addTo('david.tomberlin@sendgrid.com');
    header.to.should.eql(['kyle.partridge@sendgrid.com', 'david.tomberlin@sendgrid.com']);
  });

  describe('unique_args', function() {
    var unique_args = { foo: 'bar', apple: 'sauce' };
    it('should allow setting unique args', function() {
      header.setUniqueArgs(unique_args);
      header.unique_args.should.eql(unique_args);
    });

    it('should allow adding unique_args one at a time', function() {
      for (var key in unique_args) {
        var args = {};
        args[key] = unique_args[key];
        header.addUniqueArgs(args);
      }
      header.unique_args.should.eql(unique_args);
      header.addUniqueArgs({secret_test: 'rawr'});
      header.unique_args.secret_test.should.eql('rawr');
    });

    it('should overwrite when calling the with a value that already exists', function() {
      header.addUniqueArgs(unique_args);
      header.unique_args.should.eql(unique_args);
      header.addUniqueArgs({apple: 'pie'});
      header.unique_args.should.not.eql(unique_args);
      header.unique_args.apple.should.eql('pie');
    });
  });

  describe('categories', function() {
    var categories = ['azure', 'dreams'];

    it('should allow setting a single category', function() {
      header.setCategory(categories[0]);
      header.category.should.equal(categories[0]);
    });

    it('should allow adding categories one at a time', function() {
      header.addCategory(categories[0]);
      header.addCategory(categories[1]);
      header.category.should.eql(categories);
    });

    it('should allow setting categories', function() {
      var categories = ['azure', 'dreams'];
      header.setCategory(categories);
      header.category.should.eql(categories);
    });
  });

  describe('filters', function() {
    it('should be able to set basic filters', function() {
      header.addFilterSetting('footer', 'enable', 1);
      header.addFilterSetting('footer', 'text/html', '<b>boo</b>');
      header.filters.should.eql({
        'footer': {
          'settings': {
            'enable': 1,
            'text/html': '<b>boo</b>'
          }
        }
      });
    });

    it('should accept filter settings as a straight up object literal', function() {
      var filters = {
        'footer': {
          'setting': {
            'enable': 1,
            'text/plain': 'You can haz footers!'
          }
        }
      }
      header.setFilterSetting(filters);
      header.filters.should.eql(filters);
    });
  });

  describe('json', function() {
    it('should produce valid json', function() {
      header.addTo('kyle.partridge@sendgrid.com');
      header.addTo(['david.tomberlin@sendgrid.com']);
      header.addUniqueArgs({foo: 'bar'});
      header.addFilterSetting('footer', 'enable', 1);
      header.addFilterSetting('footer', 'text/html', '<b>boo</b>');
      JSON.parse(header.toJson()).should.eql(header);
    });
  });
});
