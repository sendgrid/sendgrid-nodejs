var assert      = require('assert');
var fs          = require('fs');

describe('sendgrid-nodejs repo', function() {
  /*
  it('should have ./Docker or docker/Docker file', function() {
    assert(fileExists('Docker') || fileExists('docker/Docker'));
  });

  it('should have ./docker-compose.yml or ./docker/docker-compose.yml file', function() {
    assert(fileExists('docker-compose.yml') || fileExists('docker/docker-compose.yml'));
  });
  */

  it('should have ./.env_sample file', function() {
    assert(fileExists('.env_sample'));
  });

  it('should have ./.gitignore file', function() {
    assert(fileExists('.gitignore'));
  });

  it('should have ./.travis.yml file', function() {
    assert(fileExists('.travis.yml'));
  });

  it('should have ./.codeclimate.yml file', function() {
    assert(fileExists('.codeclimate.yml'));
  });

  it('should have ./CHANGELOG.md file', function() {
    assert(fileExists('CHANGELOG.md'));
  });

  it('should have ./CODE_OF_CONDUCT.md file', function() {
    assert(fileExists('CODE_OF_CONDUCT.md'));
  });

  it('should have ./CONTRIBUTING.md file', function() {
    assert(fileExists('CONTRIBUTING.md'));
  });

  it('should have ./.github/ISSUE_TEMPLATE file', function() {
    assert(fileExists('.github/ISSUE_TEMPLATE'));
  });

  it('should have ./LICENSE.md file', function() {
    assert(fileExists('LICENSE.md'));
  });

  it('should have ./.github/PULL_REQUEST_TEMPLATE file', function() {
    assert(fileExists('.github/PULL_REQUEST_TEMPLATE'));
  });

  it('should have ./README.md file', function() {
    assert(fileExists('README.md'));
  });

  it('should have ./TROUBLESHOOTING.md file', function() {
    assert(fileExists('TROUBLESHOOTING.md'));
  });

  it('should have ./USAGE.md file', function() {
    assert(fileExists('USAGE.md'));
  });

  /*
  it('should have ./USE_CASES.md file', function() {
    assert(fileExists('USE_CASES.md'));
  });
  */

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
