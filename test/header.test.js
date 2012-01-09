var Header = require('../lib/header').Header;

describe('Header', function() {

    var header;
    beforeEach(function() {
        header = new Header();
    });

    it('should store a user to address in an array', function() {
        header.addTo('example@example.com');
        header.data.to.should.eql(['example@example.com']);
        header.toJson().should.equal('{"to": ["example@example.com"]}');
    });

    it('should allow multiple to addresses', function() {
        header.addTo(['example1@example.com', 'example2@example.com']);
        header.toJson().should.equal('{"to": ["example1@example.com","example2@example.com"]}');
    });

    it('should allow names and emails', function() {
        header.addTo(['example1@example.com', 'example2@example.com']);
        header.addSubVal('[name]', ['Name 1', 'Name 2']);
        header.toJson().should.equal('{"to": ["example1@example.com","example2@example.com"],"sub":{"[name]":["Name 1","Name 2"]}}');
    });

    it('should allow unique args', function() {
        header.setUniqueArgs(['Arg 1', 'Arg 2']);
        header.toJson().should.equal('{"unique_args": ["Arg 1","Arg 2"]}');
    });

    it('should allow categories', function() {
        header.setCategory('Category');
        header.toJson().should.equal('{"category": "Category"}');
    });

    it('should allow filter settings', function() {
        header.addFilterSetting('unsubscribe', 'enable', '1');
        header.toJson().should.equal('{"filters": {"unsubscribe":{"settings":{"enable":"1"}}}}');
    });

    it('should return proper json', function() {
        header.addTo('test@test.test');
        var headerJson = header.toJson();
        var headerData = JSON.stringify(header.data);
        JSON.parse(headerJson).should.eql(JSON.parse(headerData))
    });
});
