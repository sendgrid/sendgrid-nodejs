var assert      = require('assert');
var fs          = require('fs');

describe('nodemailer-sendgrid-transport repo', function() {
  it('should have ./README.md file', function() {
    assert(fileExists('README.md'));
  });

  it('should have ./USAGE.md file', function() {
    assert(fileExists('USAGE.md'));
  });

  it('should have ./USE_CASES.md file', function() {
    assert(fileExists('USE_CASES.md'));
  });

  function fileExists(filepath) {
    try {
      return fs.statSync(filepath).isFile();
    } catch(e) {
      if (e.code === 'ENOENT') {
        console.log('' + filepath + ' doesn\'t exist.');
        return false;
      }
      throw e;
    }
  }
});
