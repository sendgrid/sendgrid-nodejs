'use strict';

//Load dependencies
const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const sleep = require('system-sleep');
const dirtyChai = require('dirty-chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const execSync = require('child_process').execSync;
const spawn = require('child_process').spawn;

//Enable should assertion style for usage with chai-as-promised
chai.should();

//Extend chai
chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(chaiAsPromised);

//Expose globals
global.expect = chai.expect;
global.sinon = sinon;

//Helper vars
let prism;
const PRISM_STARTUP = 12000;

//Load sinon extensions
require('mocha-sinon');

//Global before
before(() => {

	//Check prism exists
  if (!fs.existsSync('/usr/local/bin/prism')) {
    if (process.platform !== 'win32') {
      try {
        execSync('test/prism.sh');
      }
      catch (e) {
        console.log(e.message);
        console.log('Error downloading the prism binary, you can try downloading directly here (https://github.com/stoplightio/prism/releases) and placing it in your /user/local/bin directory');
        process.exit(1);
      }
    }
    else {
      console.log('Please download the Windows binary (https://github.com/stoplightio/prism/releases) and place it in your /usr/local/bin directory');
      process.exit(1);
    }
  }

	//Start prism
  console.log('Activating Prism (~' + (PRISM_STARTUP / 1000) + 's)');
  prism = spawn('prism', ['run', '--mock', '--list', '--spec', 'https://raw.githubusercontent.com/sendgrid/sendgrid-oai/master/oai_stoplight.json'], { detached: true });
  prism.stdout.on('data', data => console.log(data.toString()));
  prism.stderr.on('data', data => console.log(data.toString()));
	sleep(PRISM_STARTUP);
});

//Global after
after(() => {
  if (prism) {
    prism.kill();
  }
});
