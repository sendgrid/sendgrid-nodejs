# Introduction

This library is broken up into several packages as a monorepo so that you only need to install the packages necessary for your use case. 
This USAGE.md contains information pertaining to all packages. For examples on how to get started quickly, head over to the READMEs of each individual package (linked and described below), which includes detailed examples.

* [@sendgrid/mail](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail) - if you just want to send email
* [@sendgrid/client](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/client) - to use all other [SendGrid v3 Web API endpoints](https://sendgrid.com/docs/API_Reference/api_v3.html)
* [@sendgrid/inbound-mail-parser](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/inbound-mail-parser) - help with parsing the SendGrid Inbound Parse API
* [@sendgrid/contact-importer](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/contact-importer) - help with importing contacts into the ContactDB
* [@sendgrid/helpers](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/helpers) - a collection of classes and helpers used internally by the above packages


# Documentation

If you would like to auto-generate documentation of the packages, you can do so locally by running:
```
./node_modules/.bin/esdoc
```
Using the .esdoc.json file, esdoc will create documentation in the docs directory. 

## Checking docs coverage

You will find a coverage.json file in the docs directory. This will contain information about the documentation coverage for each of the different files in this repo.