'use strict';

//Load dependencies
const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const dirtyChai = require('dirty-chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

//Enable should assertion style for usage with chai-as-promised
chai.should();

//Extend chai
chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(chaiAsPromised);

//Load sinon extensions
require('mocha-sinon');

//Expose globals
global.expect = chai.expect;
global.sinon = sinon;
