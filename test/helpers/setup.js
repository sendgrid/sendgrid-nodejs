'use strict';

//Load dependencies
const chai = require('chai');
const sinon = require('sinon');
const dirtyChai = require('dirty-chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

//Load sinon extensions
require('sinon-as-promised')(Promise);
require('mocha-sinon');

//Enable should assertion style for usage with chai-as-promised
chai.should();

//Extend chai
chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(chaiAsPromised);

//Expose globals
global.expect = chai.expect;
global.sinon = sinon;
