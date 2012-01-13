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

    it('should overwrite when calling addUniqueArgs with a value that already exists', function() {
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

  describe('sections', function() {
    var section_args = {'-sectionName1-': 'text 1', '-sectionName2-': 'text 2'};
    it('should allow setting a single section', function() {
      header.setSection(section_args);
      header.section.should.eql(section_args);
    });

    it('should allow adding section args one at a time', function() {
      for (var key in section_args) {
        var args = {};
        args[key] = section_args[key];
        header.addSection(args);
      }
      header.section.should.eql(section_args);
      header.addSection({cow: 'moo'});
      header.section.should.not.eql(section_args);
      header.section.cow.should.eql('moo');
    });

    it('should overwrite section when calling addSection with a value that already exists', function() {
      header.addSection(section_args);
      header.section.should.eql(section_args);
      header.addSection({'-sectionName1-': 'cows are nice'});
      header.section.should.not.eql(section_args);
      header.section['-sectionName1-'].should.eql('cows are nice');
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

      var parse = JSON.parse(header.toJson());
      parse.to.should.eql(header.to);
      parse.unique_args.should.eql(header.unique_args);
      parse.filters.should.eql(header.filters);
    });

    it('should not include the "to" parameter when there are none', function() {
      header.setCategory('nothing');
      var json = header.toJson();
      assert(_.isUndefined(JSON.parse(json).to), 'should be empty');
    });

    it('should not include the "sub" parameter when there are none', function() {
      header.setCategory('nothing');
      var json = header.toJson();

      assert(_.isUndefined(JSON.parse(json).sub), 'should be empty');
    });

    it('should not include the "unique_args" parameter when there are none', function() {
      header.setCategory('nothing');
      var json = header.toJson();

      assert(_.isUndefined(JSON.parse(json).unique_args), 'should be empty');
    });

    it('should not include the "category" parameter when there are none', function() {
      header.addUniqueArgs({food: 'bar'});
      var json = header.toJson();

      assert(_.isUndefined(JSON.parse(json).category), 'should be empty');
    });

    it('should not include the "filters" parameter when there are none', function() {
      header.addUniqueArgs({food: 'bar'});
      var json = header.toJson();

      assert(_.isUndefined(JSON.parse(json).filters), 'should be empty');
    });

    it('should not remove any parameters on this object', function() {
      header.addTo('kyle.partridge@sendgrid.com');
      header.addTo(['david.tomberlin@sendgrid.com']);
      header.addUniqueArgs({foo: 'bar'});
      header.addFilterSetting('footer', 'enable', 1);
      header.addFilterSetting('footer', 'text/html', '<b>boo</b>');

      // call the json method to test if it removed anything
      header.toJson();

      header.to.should.eql(['kyle.partridge@sendgrid.com', 'david.tomberlin@sendgrid.com']);
      header.unique_args.should.eql({foo: 'bar'});
      header.filters.should.eql({
        footer: {
          settings: {
            enable: 1,
            'text/html': '<b>boo</b>'
          }
        }
      });
    });
  });
});
