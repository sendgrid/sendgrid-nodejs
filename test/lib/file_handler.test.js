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
    var path = '/usr/local/bin/vim';
    var handler = new FileHandler({
      filename: 'test',
      path: path
    });

    expect(handler.type).to.equal('path');
    expect(handler.path).to.equal(path);
  });

  it('should replace the contentType even if it is empty', function() {
    var url = 'http://i.imgur.com/HnAga.png';
    var handler = new FileHandler({
      filename: 'test',
      url: url,
      contentType: ''
    });

    expect(handler.type).to.equal('url');
    expect(handler.contentType).to.equal('image/png');
    expect(handler.url).to.equal(url);
  });

  it('should handle url files', function() {
    var url = 'http://i.imgur.com/HnAga.png';
    var handler = new FileHandler({
      filename: 'test',
      url: url
    });

    expect(handler.type).to.equal('url');
    expect(handler.url).to.equal(url);
  });

  it('should handle empty files', function() {
    var handler = new FileHandler({
      filename: 'test'
    });

    expect(handler.filename).to.equal('test');
    expect(handler.type).to.equal('none');
  });
});
