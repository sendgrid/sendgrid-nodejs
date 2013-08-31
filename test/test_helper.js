process.env.NODE_ENV  = 'test';
var dotenv            = require('dotenv')();
dotenv.load();

global.API_USER       = process.env.API_USER || 'some_sendgrid_username';
global.API_KEY        = process.env.API_KEY || 'some_sendgrid_password';
global.sendgrid       = require('../lib/sendgrid')(API_USER, API_KEY);
global.expect         = require('chai').expect;
