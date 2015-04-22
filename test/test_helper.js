process.env.NODE_ENV  = 'test';
var dotenv            = require('dotenv')();
global.http = require('http');
dotenv.load();

global.API_USER       = process.env.API_USER || 'some_sendgrid_username';
global.API_KEY        = process.env.API_KEY || 'some_sendgrid_password';
global.SendGrid       = require('../lib/sendgrid');
global.expect         = require('chai').expect;
