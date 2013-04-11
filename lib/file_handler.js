var https = require('https');
var http = require('http');
var mime = require('mime');
var _ = require('underscore');
var url = require('url');
var fs = require('fs');

/**
 * Class to handle file attachments on an email.
 *
 * @param  {object}  file_object              Options to create a FileHandler
 * @param  {string}  file_object.filename     The name of the file to send.
 *                                            This will be guessed based on the file added
 *                                            if blank.
 * @param  {string}  file_object.contentType  The Content-Type of the file.
 * @param  {string}  file_object.content      The content to send in the file (usually a Buffer)
 * @param  {string}  file_object.cid          The cid to use for inline content
 * @param  {string}  file_object.path         The absolute path of the file on the filesystem
 * @param  {string}  file_object.url          The url to fetch a file from before sending
 */
function FileHandler(file_object) {
  this.filename = file_object.filename;

  if (file_object.contentType) {
    this.contentType = file_object.contentType;
  }

  if (file_object.cid) {
    this.cid = file_object.cid;
  }

  if (file_object.content) {
    this.type = 'content';
    this.content = file_object.content;
    if (!this.contentType) {
      this.contentType = mime.lookup(this.filename);
    }
  } else if (file_object.path) {
    this.type = 'path';
    this.path = file_object.path;
    if (!this.filename) {
      this.filename = file_object.path.split('\/').pop();
    }
    if (_.isEmpty(file_object.contentType)) {
      this.contentType = mime.lookup(this.path);
    }
  } else if (file_object.url) {
    this.type = 'url';
    this.url = file_object.url;
    if (!this.contentType) {
      this.contentType = mime.lookup(this.url);
    }
  } else {
    this.type = 'none';
    this.contentType = 'none';
  }
}

/**
 * The different methods of loading a file based on the type
 */
FileHandler.handlers = {
  content: function(file, callback) {
    if (file.content) {
      callback();
    } else {
      callback(true, 'Content was missing');
    }
  },
  path: function(file, callback) {
    fs.readFile(file.path, function(error, data) {
      if (error) {
        return callback(true, error);
      } else {
        file.content = data;
        callback();
      }
    });
  },
  url: function(file, callback) {
    var urlParts = url.parse(file.url);
    var host = urlParts.host;
    var path = urlParts.path;

    // starting http request
    var req = http.request({host: host, path: path, method: 'GET'}, function(res) {
      // what follows is logic for handing the file being returned
      var bufferArray = [];
      var totalBufferSize = 0;
      res.setEncoding('base64');
      res.on('data', function(chunk) {
        totalBufferSize += Buffer.byteLength(chunk);
        bufferArray.push(chunk);
      });

      res.on('end', function() {
        var buffer = new Buffer(totalBufferSize, 'base64');
        var bufPos = 0;
        _(bufferArray).each(function(val) {
          bufPos += buffer.write(val, bufPos, 'base64');
        });
        file.content = buffer;
        callback();
      });
    });

    req.on('error', function(error) {
      callback(true, error);
    });

    req.end();
  },
  none: function(file, callback) {
    callback(true, 'File was not included');
  }
};

/**
 * Loads the content of the file based on the type
 * and calls a callback when finished.
 *
 * @param  {function}  callback  A function to call when
 *                               the result is finished.
 */
FileHandler.prototype.loadContent = function(callback) {
  var handler = FileHandler.handlers[this.type];
  if (handler) {
    FileHandler.handlers[this.type](this, callback);
  } else {
    callback(true, 'Upload method not supported');
  }
}

module.exports = FileHandler;
