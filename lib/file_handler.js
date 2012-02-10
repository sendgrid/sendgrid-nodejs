var https = require('https');
var http = require('http');
var mime = require('mime');
var _ = require('underscore');
var url = require('url');
var fs = require('fs');

function FileHandler(file_object) {
  this.filename = file_object.filename;

  if (file_object.contentType) {
    this.contentType = file_object.contentType;
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

FileHandler.handlers = {
  content: function(file, callback) {
    if (file.content) {
      callback(true);
    } else {
      callback(false, 'Content was missing');
    }
  },
  path: function(file, callback) {
    fs.readFile(file.path, function(error, data) {
      if (error) {
        return callback(false, error);
      } else {
        file.content = data;
        callback(true);
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
        callback(true);
      });
    });

    req.on('error', function(error) {
      callback(false, error);
    });

    req.end();
  },
  none: function(file, callback) {
    callback(false, 'File was not included');
  }
};

FileHandler.prototype.loadContent = function(callback) {
  var handler = FileHandler.handlers[this.type];
  if (handler) {
    FileHandler.handlers[this.type](this, callback);
  } else {
    callback(false, 'Upload method not supported');
  }
}

module.exports = FileHandler;
