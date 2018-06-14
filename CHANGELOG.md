# Change Log
All notable changes to this project will be documented in this file.

## [6.3.0] - 2018-1-18 ##

### Added
- [PR #691](https://github.com/sendgrid/sendgrid-nodejs/pull/691): Added support for `dynamicTemplateData`. Big thanks to [Raju Mandapati](https://github.com/mvpspl619) for the PR!
- [PR #510](https://github.com/sendgrid/sendgrid-nodejs/pull/510): A tutorial to deploy a simple Hello Email app on Digital Ocean with Node.js using this SDK. Big thanks to [Devin Chasanoff](https://github.com/devchas) for the PR!
- [PR #628](https://github.com/sendgrid/sendgrid-nodejs/pull/628): Add a repository overview in CONTRIBUTING.md. Big thanks to [Nitish Phanse](https://github.com/nitish24p) for the PR!
- [PR #603](https://github.com/sendgrid/sendgrid-nodejs/pull/603): Added links to CONTRIBUTING.md. Big thanks to [John Stevans](https://github.com/jstevans) for the PR!

### Fixed
- [PR #687](https://github.com/sendgrid/sendgrid-nodejs/pull/687): Exclude sections from camel/snake case conversion in Mail helper class. Big thanks to [Simon Bélanger](https://github.com/simonbelanger) for the PR!
- [PR #666](https://github.com/sendgrid/sendgrid-nodejs/pull/666): Bumped the moment, chai-as-promised, and dirty-chai version in package.json. Big thanks to [Cory Trimm](https://github.com/ctrimm) for the PR!
- [PR #651](https://github.com/sendgrid/sendgrid-nodejs/pull/651): Typo - Change `contentId` to `content_id`. Big thanks to [Tak Tran](https://github.com/taktran) for the PR!
- [PR #610](https://github.com/sendgrid/sendgrid-nodejs/pull/610): Exclude esdoc node modules. Big thanks to [Nitish Phanse](https://github.com/nitish24p) for the PR!

## [6.2.1] - 2018-1-18 ##
### Fixed
- PR #619, Fixes #618: Update definitions for tsc 2.6
- Thanks to [Francesco Soncina](https://github.com/phra) for the PR!

## [6.2.0] - 2018-1-13 ##
### Added
- PR #650: Expose Client and MailService classes
- Thanks to [Adam Reis](https://github.com/adamreisnz) for the PR!
- PR #468: Heroku Tutorial
- Thanks to [Shawn Wang](https://github.com/sw-yx) for the PR!
- PR #477: Check if "body" on "response" is actually defined before accessing it
- Thanks to [Philipp Gröschler](https://github.com/phgroe) for the PR!
- PR #457: Function to remove HTML tags
- Thanks to [Nathaniel Hodges](https://github.com/uniOpifex) for the PR!
- PR #580: Simplify complexity in arrayToJson helpers
- Thanks to [Anthony Juan Christian](https://github.com/anthonyjuan) for the PR!
- PR #597: Adds file structure for USE_CASES.md
- Thanks to [Shriyash Jalukar](https://github.com/shriyash) for the PR!
- PR #595: Added Code Review to CONTRIBUTING.md
- Thanks to [Manjiri Tapaswi](https://github.com/mptap) for the PR!
- PR #471: Google App Engine (GAE) Tutorial
- Thanks to [Thujeevan](https://github.com/thujeevan) for the PR!
- PR #449: Updated the endpoint which allows the retrieval of all recipients
- Thanks to [Divya Rani](https://github.com/Divya063) for the PR!
- PR #568: Added unittest to check for specific repo files
- Thanks to [Manjiri Tapaswi](https://github.com/mptap) for the PR!
- PR #594: Sr. Front End Engineer job posting in Announcements
- Thanks to [Marghodk](https://github.com/Marghodk) for the PR!

### Fixed
- PR #605: Chai dependency version issue
- Thanks to [Mukul Mishra](https://github.com/mukulmishra18) for the PR!
- PR #581: Remove .only from test
- Thanks to [Cédric Guérin](https://github.com/ElPonito) for the PR!


## [6.1.6] - 2017-10-30 ##
### Added
- [Pull #539](https://github.com/sendgrid/sendgrid-nodejs/pull/539): Add subscription widget to packages
- Thanks to [Devin Chasanoff](https://github.com/devchas) for the PR!

### Updated
- [Pull #542](https://github.com/sendgrid/sendgrid-nodejs/pull/542): Turn ContactImporter into ES6 class
- Thanks to [Seth Etter](https://github.com/sethetter) for the PR!

## [6.1.5] - 2017-10-30 ##
### Updated
- [Pull #542](https://github.com/sendgrid/sendgrid-nodejs/pull/542): Turn ContactImporter into ES6 class
- Thanks to [Seth Etter](https://github.com/sethetter) for the PR!

## [6.1.4] - 2017-09-11 ##
### Updated
- [Pull #445](https://github.com/sendgrid/sendgrid-nodejs/pull/445): Documentation Updates for better DX/UX
- Updates to README, TROUBLESHOOTING and USE_CASE documents to improve the developer experience.

## [6.1.3] - 2017-09-11 ##
### Fixed
- Pull #442: This addresses the issue where custom args and substitutions would have their keys transformed to camel case / snake case.
- Solves #441: Substitution is not working
- Thanks to [Adam Reis](https://github.com/adamreisnz) for the PR!

## [6.1.2] - 2017-08-31 ##
### Fixed
- Pull #438: Content is not mandatory
- Solves #435: Unexpected Error when trying to send transactional email
- Thanks to [Adam Reis](https://github.com/adamreisnz) for the PR!

## [6.1.1] - 2017-08-30 ##
### Fixed
- Pull #436, solves #433: Convert plain data to personalization class instance
- Thanks to [Adam Reis](https://github.com/adamreisnz) for the PR!

## [6.1.0] - 2017-08-30 ##
### Added
- Pull #430, solves #428: TypeScript support added for v6 packages
- Thanks to [Benjamin Pannell](https://github.com/SPARTAN563) for the PR!

## [6.0.0] - 2017-08-28 ##
### BREAKING CHANGE
- BIG, HUGE, MEGA THANKS to [Adam Reis](https://github.com/adamreisnz) for this amazing PR!!!
- Pull #407 via #378: API Simplification
- v6.0.0 is a complete rewrite of this SDK for all endpoints. To upgrade from v5.X and lower, we suggest you update your code based on the examples found [here](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/mail/USE_CASES.md) for mail send and [here](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/client/USAGE.md) for all other endpoints.
- Please do not hesitate to [open an issue](https://github.com/sendgrid/sendgrid-nodejs/issues) if there are any challenges and/or feedback. [PRs](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CONTRIBUTING.md) are also welcome.

## [5.2.2] - 2017-08-14 ##
### Fix
- Pull #418: Fixed #417: fix: Update TypeScript definition to correct callback arguments for API
- Thanks to [Benjamin Pannell](https://github.com/SPARTAN563) for the PR!


## [5.2.1] - 2017-08-09 ##
### Fixed
- Pull #413: Handle null and undefined values in substitutions
- Thanks to [Matteo Ferrando](https://github.com/chamini2) for the PR!

## [5.2.0] - 2017-07-20 ##
### Fixed
- Pull #410: Cast substitution values to strings
- Thanks to [Ryan James](https://github.com/dangerismycat) for the PR!

## [5.1.2] - 2017-06-30 ##
### Fixed
- Pull #399
- Fix `batch_id` type
- Thanks to [Leonardo Testa](https://github.com/testica) for the PR!

## [5.1.1] - 2017-06-1 ##
### Added
- Pull #391
- Return personalizations as an array of request compatible JSON.
- Thanks to [Paul Hrimiuc](https://github.com/hpaul) for the PR!

## [5.1.0] - 2017-05-3 ##
### Added
- Pull #325
- Run prism for tests
- Now the mock SendGrid server, powered by [Prism](https://stoplight.io/platform/prism/) is automated locally and on Travis
- Thanks to [Mike Ralphson](https://github.com/MikeRalphson) for the PR!

## [5.0.1] - 2017-04-24 ##
### Fixed
- Pull #385
- Remove JSON.parse() around response bodies in contact-importer
- Thanks to [Eemeli Aro](https://github.com/eemeli) for the PR!

## [5.0] - 2017-03-31 ##
### BREAKING CHANGE
- Pull #328
- Drop 0.10, 0.12 from supported Node.js versions, add 6
- Thanks to [Mike Ralphson](https://github.com/MikeRalphson) for the PR!

## [4.10] - 2017-03-30 ##
### Added
- Pull #303
- Add Inbound Parse data parser
- Thanks to [Jamie](https://github.com/jamsinclair) for the PR!

## [4.9] - 2017-03-28 ##
### Added
- Pull #371
- Catch error in sendgrid, partially solves #370
- Thanks to [gf](https://github.com/furstenheim) for the PR!

## [4.8.4] - 2017-03-14 ##
### Fixed
- Pull #348
- Fix typescript definition for the ClickTracking
- Thanks to [dhenriques](https://github.com/dhenriques) for the PR!

## [4.8.3] - 2017-03-14 ##
### Fixed
- Pull #368, Fixes #367
- Personalization.getSubstitutions() return type incorrect in index.d.ts TypeScript definition file
- Thanks to [Brian Love](https://github.com/blove) for the PR!

## [4.8.2] - 2017-03-14 ##
### Fixed
- Pull #338
- Fix function name in mail helper and fix the corresponding test
- Thanks to [Seoker Wang](https://github.com/seoker) for the PR!

## [4.8.1] - 2017-03-13 ##
### Fixed
- Pull #354
- fix: Make various TypeScript request components optional
- Thanks to [Benjamin Pannell](https://github.com/SPARTAN563) for the PR!

## [4.8.0] - 2017-03-10 ##
### Added
- Pull #333
- [TypeDefinition] SendGrid.API should return Promise<T> instead of PromiseLike<T>
- Thanks to [Ayman Nedjmeddine](https://github.com/IOAyman) for the PR!

## [4.7.1] - 2016-10-25 ##
### Added
- Pull #329
- Simplified installation instructions
- Thanks to [Heitor Tashiro Sergent](https://github.com/heitortsergent) for the PR!

## [4.7.0] - 2016-10-14 ##
### Added
- Pull #323, Fixed issue #317
- Updates nodejs-http-client dependency to [v2.3.0](https://github.com/sendgrid/nodejs-http-client/releases/tag/v2.3.0)
- Invoke the API callback with a mocked response upon Error
- Thanks to [Huli](https://github.com/aszx87410) for the PR!

## [4.6.0] - 2016-10-13 ##
### Added
- Pull #319, Fixed issue #266
- Converts `response.body` to have valid json objects
- Thanks to [Hugo Durães](https://github.com/hugoduraes) for the pull request!

## [4.5.0] - 2016-10-05 ##
## Added
- Pull #308 [feat: Add support for promises to the TypeScript definitions file](https://github.com/sendgrid/sendgrid-nodejs/pull/308)
- Thanks to [Benjamin Pannell](https://github.com/SPARTAN563) for the pull request!

## [4.4.1] - 2016-09-27 ##
## Fixed
- Pull #309 [Allow emptyRequest() to be called with a request object](https://github.com/sendgrid/sendgrid-nodejs/pull/309)
- Thanks to [Benjamin Pannell](https://github.com/SPARTAN563) for the fix!

## [4.4.0] - 2016-09-27 ##
## Added
- Pull #299: [Fill 'response' property in error instance](https://github.com/sendgrid/sendgrid-nodejs/pull/299)
- This makes the behavior when using callbacks consistent with the promise counterpart.
That is, in both cases, error.response is present
- Thanks to [Guilherme Souza](https://github.com/sitegui) for the pull request!

## [4.3.1] - 2016-09-27 ##
## Fixed
- Pull #300: [Correct TypeScript definitions](https://github.com/sendgrid/sendgrid-nodejs/pull/300)
- Thanks to [Benjamin Pannell](https://github.com/SPARTAN563) for the fix!

## [4.3.0] - 2016-09-15 ##
## Added
- Pull #251: [Add TypeScript typings definition file for v3 API](https://github.com/sendgrid/sendgrid-nodejs/pull/251)
- Thanks to [Benjamin Pannell](https://github.com/SPARTAN563) for the pull request!

## [4.2.1] - 2016-09-15 ##
### Fixed
- Issue #292: [4.2.0 Error: Cannot find module 'debug'](https://github.com/sendgrid/sendgrid-nodejs/issues/292)

## [4.2.0] - 2016-09-14 ##
### Added
- Pull Request #278: [Tkp/contact importer](https://github.com/sendgrid/sendgrid-nodejs/pull/278)
- Thanks to [Tom Kirkpatrick](https://github.com/mrfelton) for the pull request!

## [4.1.0] - 2016-09-09 ##
### Added
- Pull Request #277: [Make SendGrid a factory that enables multiple prototype instances](https://github.com/sendgrid/sendgrid-nodejs/pull/277)
- Thanks to [Tom Kirkpatrick](https://github.com/mrfelton) for the pull request!

## [4.0.2] - 2016-08-24 ##
### Added
- Table of Contents in the README
- Added a [USE_CASES.md](https://github.com/sendgrid/sendgrid-nodejs/blob/master/USE_CASES.md) section, with the first use case example for transactional templates

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
- emptyRequest now accepts an object with data to extend the empty request with, this will allow simpler syntax for initializing requests.
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

