# Change Log
All notable changes to this project will be documented in this file.

## [4.0.1] - 2016-08-02 ##
### Fixed
- Pull request [#264](https://github.com/sendgrid/sendgrid-nodejs/pull/264): Fixed backwards compatability with Node.js versions 0.10 and 0.12
- Use var instead of let
- Check if Promise is defined

## [4.0.0] - 2016-08-02 ##
### Breaking Change
- Pull request [#261](https://github.com/sendgrid/sendgrid-nodejs/pull/261)
- BIG THANKS to [Adam Buczynski](https://github.com/adambuczynski)!!!

### Fixed
- Issue [#240](https://github.com/sendgrid/sendgrid-nodejs/issues/240)
- Issue [#246](https://github.com/sendgrid/sendgrid-nodejs/issues/246)
- Issue [#206](https://github.com/sendgrid/sendgrid-nodejs/issues/206)

### Added
- Extracted some logic into helpers
- Using a getEmptyRequest helper to avoid code duplication
- emtpyRequest now accepts an object with data to extend the empty request with, this will allow simpler syntax for initializing requests.
- Callback function now receives two parameters as per Node conventions (error, response)
- If no callback provided, the method will return a promise instead.
- Implemented promise API when not passing a callback function
- Using native Promise by default if present, but allow users to override this with any other implementation by setting Sendgrid.Promise to any value, e.g. Sendgrid.Promise = require('bluebird')

## [3.0.11] - 2016-07-26 ##
### Added
- [Troubleshooting](https://github.com/sendgrid/sendgrid-python/blob/master/TROUBLESHOOTING.md) section

## [3.0.10] - 2016-07-23
### Fixed
- Fixed typo in Mail Helper per [pull request #250](https://github.com/sendgrid/sendgrid-nodejs/pull/250)
- Thanks to [Cameron Wilby](https://github.com/cameronoca) for finding the issue!

## [3.0.9] - 2016-07-20
### Added
- README updates
- Update introduction blurb to include information regarding our forward path
- Update the v3 /mail/send example to include non-helper usage
- Update the generic v3 example to include non-fluent interface usage

## [3.0.8] - 2016-07-12
### Added
- Update docs, unit tests and examples to include Sender ID

## [3.0.7] - 2016-07-05
### Updated
- Content based on our updated [Swagger/OAI doc](https://github.com/sendgrid/sendgrid-oai)

## [3.0.6] - 2016-07-01
### Fixed
- GET suppression/bounces needs header to be Accept: application/json

## [3.0.5] - 2016-06-14
### Fixed
- Updated dependency on https://github.com/sendgrid/nodejs-http-client
- Sending email with accents: https://github.com/sendgrid/sendgrid-nodejs/issues/239
- Thanks [eaparango](https://github.com/eaparango)!

## [3.0.4] - 2016-06-14
### Fixed
- Fixed exports and README example

## [3.0.3] - 2016-06-14
### Added
- Moving mail helper export

## [3.0.2] - 2016-06-14
### Added
- Added mail helper

## [3.0.1] - 2016-06-14
### Fixed
- Missing index.js

## [3.0.0] - 2016-06-13
### Added
- Breaking change to support the v3 Web API
- New HTTP client
- v3 Mail Send helper

## [2.0.0] - 2015-10-13
## Fixed
- Add cc now uses the WebAPI instead of the SMTPApi. Read disclaimer for details

## [1.9.1] - 2015-7-20
### Changed
- Pinned request version to be less than `2.59.0` because it broke something

## [1.9.0] - 2015-7-07
### Added
- setFromName function [#175](https://github.com/sendgrid/sendgrid-nodejs/pull/175)

## [1.8.0] - 2015-5-06
### Added
- addBcc and setBccs functions

## [1.7.0] - 2015-4-27
### Added
- Support for API keys

## [1.6.1] - 2015-4-5
### Added
- Updated version of lodash for optimizations [#158](https://github.com/sendgrid/sendgrid-nodejs/pull/158)
- Temporarily make travis use npm 2.7.6 [3e16a2](https://github.com/sendgrid/sendgrid-nodejs/commit/3e16a2b8ed180e84acd81dd15550017b1d7d47ef)

## [1.6.0] - 2015-2-3
### Added
- ASM Group ID support
- CHANGELOG.md

