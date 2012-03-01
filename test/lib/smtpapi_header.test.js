var SmtpapiHeaders = require('../../lib/smtpapi_headers');
var _ = require('underscore');

describe('SmtpapiHeader', function() {
  var header;
  beforeEach(function() {
    header = new SmtpapiHeaders();
  });

  it('should allow multiple to addresses', function() {
    header.addTo('kyle.partridge@sendgrid.com');
    expect(header.to).to.eql(['kyle.partridge@sendgrid.com']);
    header.addTo('david.tomberlin@sendgrid.com');
    expect(header.to).to.eql(['kyle.partridge@sendgrid.com', 'david.tomberlin@sendgrid.com']);
  });

  describe('unique_args', function() {
    var unique_args = { foo: 'bar', apple: 'sauce' };
    it('should allow setting unique args', function() {
      header.setUniqueArgs(unique_args);
      expect(header.unique_args).to.eql(unique_args);
    });

    it('should allow adding unique_args one at a time', function() {
      for (var key in unique_args) {
        var args = {};
        args[key] = unique_args[key];
        header.addUniqueArgs(args);
      }
      expect(header.unique_args).to.eql(unique_args);
      header.addUniqueArgs({secret_test: 'rawr'});
      expect(header.unique_args.secret_test).to.eql('rawr');
    });

    it('should overwrite when calling addUniqueArgs with a value that already exists', function() {
      header.addUniqueArgs(unique_args);
      expect(header.unique_args).to.eql(unique_args);
      header.addUniqueArgs({apple: 'pie'});
      expect(header.unique_args).not.to.eql(unique_args);
      expect(header.unique_args.apple).to.eql('pie');
    });
  });

  describe('categories', function() {
    var categories = ['azure', 'dreams'];

    it('should allow setting a single category', function() {
      header.setCategory(categories[0]);
      expect(header.category).to.eql([categories[0]]);
    });

    it('should allow adding categories one at a time', function() {
      header.addCategory(categories[0]);
      header.addCategory(categories[1]);
      expect(header.category).to.eql(categories);
    });

    it('should allow setting categories', function() {
      var categories = ['azure', 'dreams'];
      header.setCategory(categories);
      expect(header.category).to.eql(categories);
    });
  });

  describe('sections', function() {
    var section_args = {'-sectionName1-': 'text 1', '-sectionName2-': 'text 2'};
    it('should allow setting a single section', function() {
      header.setSection(section_args);
      expect(header.section).to.eql(section_args);
    });

    it('should allow adding section args one at a time', function() {
      for (var key in section_args) {
        var args = {};
        args[key] = section_args[key];
        header.addSection(args);
      }
      expect(header.section).to.eql(section_args);
      header.addSection({cow: 'moo'});
      expect(header.section).not.to.eql(section_args);
      expect(header.section.cow).to.eql('moo');
    });

    it('should overwrite section when calling addSection with a value that already exists', function() {
      header.addSection(section_args);
      expect(header.section).to.eql(section_args);
      header.addSection({'-sectionName1-': 'cows are nice'});
      expect(header.section).to.not.eql(section_args);
      expect(header.section['-sectionName1-']).to.eql('cows are nice');
    });
  });

  describe('filters', function() {
    it('should be able to set basic filters', function() {
      header.addFilterSetting('footer', 'enable', 1);
      header.addFilterSetting('footer', 'text/html', '<b>boo</b>');
      expect(header.filters).to.eql({
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
      expect(header.filters).to.eql(filters);
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
      expect(parse.to).to.eql(header.to);
      expect(parse.unique_args).to.eql(header.unique_args);
      expect(parse.filters).to.eql(header.filters);
    });

    it('should not include the "to" parameter when there are none', function() {
      header.setCategory('nothing');
      var json = header.toJson();
      expect(_.isUndefined(JSON.parse(json).to)).to.be.true;
    });

    it('should not include the "sub" parameter when there are none', function() {
      header.setCategory('nothing');
      var json = header.toJson();

      expect(_.isUndefined(JSON.parse(json).sub)).to.be.true;
    });

    it('should not include the "unique_args" parameter when there are none', function() {
      header.setCategory('nothing');
      var json = header.toJson();

      expect(_.isUndefined(JSON.parse(json).unique_args)).to.be.true;
    });

    it('should not include the "category" parameter when there are none', function() {
      header.addUniqueArgs({food: 'bar'});
      var json = header.toJson();

      expect(_.isUndefined(JSON.parse(json).category)).to.be.true;
    });

    it('should not include the "filters" parameter when there are none', function() {
      header.addUniqueArgs({food: 'bar'});
      var json = header.toJson();

      expect(_.isUndefined(JSON.parse(json).filters)).to.be.true;
    });

    it('should not remove any parameters on this object', function() {
      header.addTo('kyle.partridge@sendgrid.com');
      header.addTo(['david.tomberlin@sendgrid.com']);
      header.addUniqueArgs({foo: 'bar'});
      header.addFilterSetting('footer', 'enable', 1);
      header.addFilterSetting('footer', 'text/html', '<b>boo</b>');

      // call the json method to test if it removed anything
      header.toJson();

      expect(header.to).to.eql(['kyle.partridge@sendgrid.com', 'david.tomberlin@sendgrid.com']);
      expect(header.unique_args).to.eql({foo: 'bar'});
      expect(header.filters).to.eql({
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
