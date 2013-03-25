var FileHandler = require('../../lib/file_handler');

describe('FileHandler', function() {
  it('should handle content files', function() {
    var buffer = new Buffer('File Content');
    var handler = new FileHandler({
      filename: 'test',
      content: buffer,
      contentType: 'image/jpeg'
    });

    expect(handler.type).to.equal('content');
    expect(handler.content).to.equal(buffer);
    expect(handler.contentType).to.equal('image/jpeg');
  });

  it('should handle files on the filesystem', function() {
    var path = __dirname + '/../assets/secret.txt';
    var handler = new FileHandler({
      path: path
    });

    expect(handler.type).to.equal('path');
    expect(handler.path).to.equal(path);
    expect(handler.filename).to.eql('secret.txt');
    expect(handler.contentType).to.equal('text/plain');
  });

  it('should replace the contentType even if it is empty', function() {
    var url = 'http://i.imgur.com/HnAga.png';
    var handler = new FileHandler({
      filename: 'test',
      url: url,
      contentType: ''
    });

    expect(handler.type).to.equal('url');
    expect(handler.url).to.equal(url);
    expect(handler.contentType).to.equal('image/png');
  });

  it('should handle url files', function() {
    var url = 'http://i.imgur.com/HnAga.png';
    var handler = new FileHandler({
      filename: 'test',
      url: url
    });

    expect(handler.type).to.equal('url');
    expect(handler.url).to.equal(url);
    expect(handler.contentType).to.equal('image/png');
  });

  it('should handle empty files', function() {
    var handler = new FileHandler({
      filename: 'test'
    });

    expect(handler.filename).to.equal('test');
    expect(handler.type).to.equal('none');
  });

  it('should handle inline content', function() {
    var buffer = new Buffer('File Content');
    var handler = new FileHandler({
      filename: 'test',
      cid: 'testcid',
      content: buffer,
      contentType: 'image/jpeg'
    });

    expect(handler.type).to.equal('content');
    expect(handler.content).to.equal(buffer);
    expect(handler.contentType).to.equal('image/jpeg');
    expect(handler.cid).to.equal('testcid');
  });
});
