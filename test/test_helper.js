global.expect = require('chai').expect;

try {
  global.setup = require('./config');
} catch(e) {
  global.setup = {};
}
