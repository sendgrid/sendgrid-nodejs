# Change Log
All notable changes to this project will be documented in this file.

[2020-11-05] Version 7.4.0
--------------------------
**Library - Chore**
- [PR #602](https://github.com/sendgrid/sendgrid-nodejs/pull/602): Deduplicate typechecks in setters. Thanks to [@jstevans](https://github.com/jstevans)!

**Library - Feature**
- [PR #712](https://github.com/sendgrid/sendgrid-nodejs/pull/712): Add method chaining in mail-service.js. Thanks to [@hjmsw](https://github.com/hjmsw)!


[2020-10-14] Version 7.3.0
--------------------------
**Library - Feature**
- [PR #771](https://github.com/sendgrid/sendgrid-nodejs/pull/771): Extend client.setDefault[Request,Headers] to accept objects. Thanks to [@aslafy-z](https://github.com/aslafy-z)!

**Library - Docs**
- [PR #1208](https://github.com/sendgrid/sendgrid-nodejs/pull/1208): Add eventwebhook package to main README. Thanks to [@chammaaomar](https://github.com/chammaaomar)!

**Library - Chore**
- [PR #1203](https://github.com/sendgrid/sendgrid-nodejs/pull/1203): remove chalk dependency. Thanks to [@nck](https://github.com/nck)!


[2020-09-16] Version 7.2.6
--------------------------
**Library - Fix**
- [PR #1190](https://github.com/sendgrid/sendgrid-nodejs/pull/1190): do not wrap names with commas in quotes. Thanks to [@eshanholtz](https://github.com/eshanholtz)!
- [PR #1198](https://github.com/sendgrid/sendgrid-nodejs/pull/1198): make attachment type and disposition optional. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #1189](https://github.com/sendgrid/sendgrid-nodejs/pull/1189): change @starkbank/ecdsa dependency v0.0.3 to updated starkbank-e…. Thanks to [@cdottori-stark](https://github.com/cdottori-stark)!


[2020-09-02] Version 7.2.5
--------------------------
**Library - Docs**
- [PR #1186](https://github.com/sendgrid/sendgrid-nodejs/pull/1186): Fix EventWebhook example in use case docs. Thanks to [@jstayton](https://github.com/jstayton)!

**Library - Fix**
- [PR #1180](https://github.com/sendgrid/sendgrid-nodejs/pull/1180): Fix typings for @sendgrid/eventwebhook. Thanks to [@igrayson](https://github.com/igrayson)!


[2020-08-19] Version 7.2.4
--------------------------
**Library - Chore**
- [PR #1171](https://github.com/sendgrid/sendgrid-nodejs/pull/1171): update GitHub branch references to use HEAD. Thanks to [@thinkingserious](https://github.com/thinkingserious)!


[2020-08-05] Version 7.2.3
--------------------------
**Library - Chore**
- [PR #1172](https://github.com/sendgrid/sendgrid-nodejs/pull/1172): collapse multiple mail-send TS signatures. Thanks to [@seromenho](https://github.com/seromenho)!


[2020-07-22] Version 7.2.2
--------------------------
**Library - Chore**
- [PR #1165](https://github.com/sendgrid/sendgrid-nodejs/pull/1165): migrate to new default sendgrid-oai branch. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Library - Docs**
- [PR #836](https://github.com/sendgrid/sendgrid-nodejs/pull/836): Remove references to legacy "Whitelabel" Verbiage. Thanks to [@crweiner](https://github.com/crweiner)!
- [PR #858](https://github.com/sendgrid/sendgrid-nodejs/pull/858): add more use cases for adding attachments. Thanks to [@cesargamboa](https://github.com/cesargamboa)!


[2020-06-24] Version 7.2.1
--------------------------
**Library - Docs**
- [PR #907](https://github.com/sendgrid/sendgrid-nodejs/pull/907): Add generation field to create template call otherwise legacy template will be created. Thanks to [@vinu-phoenix](https://github.com/vinu-phoenix)!
- [PR #1151](https://github.com/sendgrid/sendgrid-nodejs/pull/1151): Update transactional-templates.md to use dynamicTemplateData instead of dynamic_template_data. Thanks to [@bttf](https://github.com/bttf)!
- [PR #1145](https://github.com/sendgrid/sendgrid-nodejs/pull/1145): Update docs for domain or email verification. Thanks to [@GeoFro](https://github.com/GeoFro)!

**Library - Fix**
- [PR #1153](https://github.com/sendgrid/sendgrid-nodejs/pull/1153): event webhook interface to process raw body. Thanks to [@eshanholtz](https://github.com/eshanholtz)!


[2020-06-10] Version 7.2.0
--------------------------
**Library - Fix**
- [PR #1141](https://github.com/sendgrid/sendgrid-nodejs/pull/1141): request validation test fix. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #1133](https://github.com/sendgrid/sendgrid-nodejs/pull/1133): travis autodeploy. Thanks to [@eshanholtz](https://github.com/eshanholtz)!
- [PR #1123](https://github.com/sendgrid/sendgrid-nodejs/pull/1123): update node version in travis for deploy via lerna. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Library - Feature**
- [PR #1136](https://github.com/sendgrid/sendgrid-nodejs/pull/1136): verify signature from event webhook. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Library - Docs**
- [PR #1131](https://github.com/sendgrid/sendgrid-nodejs/pull/1131): Fixing sandbox key in kitchen-sink documentation. Thanks to [@itsjoekent](https://github.com/itsjoekent)!
- [PR #850](https://github.com/sendgrid/sendgrid-nodejs/pull/850): Add sandbox setting to kitchen-sink documentation. Thanks to [@notdmart](https://github.com/notdmart)!


[2020-05-13] Version 7.1.1
--------------------------
**Library - Fix**
- [PR #1112](https://github.com/sendgrid/sendgrid-nodejs/pull/1112): migrate to common prism setup. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #1113](https://github.com/sendgrid/sendgrid-nodejs/pull/1113): don't limit the request content length. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2020-04-29] Version 7.1.0
--------------------------
**Library - Feature**
- [PR #600](https://github.com/sendgrid/sendgrid-nodejs/pull/600): Add subuser impersonation to client. Thanks to [@CaptainYarb](https://github.com/CaptainYarb)!
- [PR #1093](https://github.com/sendgrid/sendgrid-nodejs/pull/1093): add support for Twilio Email. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Docs**
- [PR #1104](https://github.com/sendgrid/sendgrid-nodejs/pull/1104): add documentation on the on-behalf-of header usage. Thanks to [@ayandyl](https://github.com/ayandyl)!
- [PR #1100](https://github.com/sendgrid/sendgrid-nodejs/pull/1100): clarify cancel and pause capabilities for scheduled sends. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #1097](https://github.com/sendgrid/sendgrid-nodejs/pull/1097): document sendAt limitations. Thanks to [@dandv](https://github.com/dandv)!

**Library - Fix**
- [PR #1102](https://github.com/sendgrid/sendgrid-nodejs/pull/1102): correct the mail TS exports. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2020-04-15] Version 7.0.1
--------------------------
**Library - Fix**
- [PR #1084](https://github.com/sendgrid/sendgrid-nodejs/pull/1084): correct the User-Agent casing. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2020-04-01] Version 7.0.0
--------------------------
**Library - Docs**
- [PR #1078](https://github.com/sendgrid/sendgrid-nodejs/pull/1078): support verbiage for login issues. Thanks to [@adamchasetaylor](https://github.com/adamchasetaylor)!
- [PR #1073](https://github.com/sendgrid/sendgrid-nodejs/pull/1073): reorg docs and add migration guide. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Library - Fix**
- [PR #985](https://github.com/sendgrid/sendgrid-nodejs/pull/985): options.uri must be string. Thanks to [@shrujalshah28](https://github.com/shrujalshah28)!
- [PR #852](https://github.com/sendgrid/sendgrid-nodejs/pull/852): correct the attachment file path test. Thanks to [@digitalica](https://github.com/digitalica)!
- [PR #1076](https://github.com/sendgrid/sendgrid-nodejs/pull/1076): add 'setTimeout' to the MailService TS definition. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Feature**
- [PR #1077](https://github.com/sendgrid/sendgrid-nodejs/pull/1077): console warning added when using an invalid API key. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #1058](https://github.com/sendgrid/sendgrid-nodejs/pull/1058): migrate from deprecated request module to axios. Thanks to [@eshanholtz](https://github.com/eshanholtz)! **(breaking change)**

**Library - Chore**
- [PR #1063](https://github.com/sendgrid/sendgrid-nodejs/pull/1063): upgrade dev dependencies and fix eslint warnings/errors. Thanks to [@eshanholtz](https://github.com/eshanholtz)!


[2020-03-18] Version 6.5.5
--------------------------
**Library - Chore**
- [PR #1069](https://github.com/sendgrid/sendgrid-nodejs/pull/1069): refactor duplicate code in client tests. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #1053](https://github.com/sendgrid/sendgrid-nodejs/pull/1053): export type MailDataRequired. Thanks to [@antonsamper](https://github.com/antonsamper)!


[2020-03-04] Version 6.5.4
--------------------------
**Library - Fix**
- [PR #1041](https://github.com/sendgrid/sendgrid-nodejs/pull/1041): require in TS at least 1 type of content for sending mail. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2020-02-19] Version 6.5.3
--------------------------
**Library - Docs**
- [PR #877](https://github.com/sendgrid/sendgrid-nodejs/pull/877): Improve the mail package's README to handle the async send(). Thanks to [@Berkmann18](https://github.com/Berkmann18)!
- [PR #827](https://github.com/sendgrid/sendgrid-nodejs/pull/827): Fix grammatical errors in README. Thanks to [@chaman-1](https://github.com/chaman-1)!
- [PR #825](https://github.com/sendgrid/sendgrid-nodejs/pull/825): Properly capitalize Brands. Thanks to [@aslafy-z](https://github.com/aslafy-z)!
- [PR #989](https://github.com/sendgrid/sendgrid-nodejs/pull/989): Update README.md to explicitly state that 'send()' returns a promise. Thanks to [@Ifunanyacollins](https://github.com/Ifunanyacollins)!
- [PR #878](https://github.com/sendgrid/sendgrid-nodejs/pull/878): Update USAGE.md to prevent query double encoding. Thanks to [@sigginet](https://github.com/sigginet)!
- [PR #984](https://github.com/sendgrid/sendgrid-nodejs/pull/984): fix typo 'Feild' to 'Field'. Thanks to [@kendalled](https://github.com/kendalled)!

**Library - Chore**
- [PR #942](https://github.com/sendgrid/sendgrid-nodejs/pull/942): Bump braces from 2.3.0 to 2.3.2 in /packages/subscription-widget. Thanks to [@dependabot](https://github.com/dependabot)!

**Library - Fix**
- [PR #1040](https://github.com/sendgrid/sendgrid-nodejs/pull/1040): update Client constructor property definition in TS declaration. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #1039](https://github.com/sendgrid/sendgrid-nodejs/pull/1039): upgrade deepmerge to resolve webpack import issue. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #921](https://github.com/sendgrid/sendgrid-nodejs/pull/921): update MailService constructor property definition in TypeScript declaration. Thanks to [@dhritzkiv](https://github.com/dhritzkiv)!


[2020-02-05] Version 6.5.2
--------------------------
**Library - Fix**
- [PR #1035](https://github.com/sendgrid/sendgrid-nodejs/pull/1035): Move @types/request back to dependencies. Thanks to [@hlian](https://github.com/hlian)!


[2020-01-24] Version 6.5.1
--------------------------
**Library - Fix**
- [PR #1030](https://github.com/sendgrid/sendgrid-nodejs/pull/1030): remove chai from dependencies. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Library - Docs**
- [PR #1028](https://github.com/sendgrid/sendgrid-nodejs/pull/1028): baseline all the templated markdown docs. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2020-01-15] Version 6.5.0
--------------------------
**Library - Docs**
- [PR #943](https://github.com/sendgrid/sendgrid-nodejs/pull/943): Update url in "DYNAMIC_TEMPLATE_CHAR_WARNING" to point to a working current link. Thanks to [@NickFoden](https://github.com/NickFoden)!

**Library - Fix**
- [PR #900](https://github.com/sendgrid/sendgrid-nodejs/pull/900): Return promise with catch handler if callback provided. Thanks to [@adamreisnz](https://github.com/adamreisnz)!
- [PR #935](https://github.com/sendgrid/sendgrid-nodejs/pull/935): Fixed deepmerge module export naming issue. Thanks to [@chrisamador](https://github.com/chrisamador)!
- [PR #1010](https://github.com/sendgrid/sendgrid-nodejs/pull/1010): Cleanup dependencies. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Library - Feature**
- [PR #932](https://github.com/sendgrid/sendgrid-nodejs/pull/932): Allow hiding warnings. Thanks to [@albertor24](https://github.com/albertor24)!

**Library - Chore**
- [PR #1011](https://github.com/sendgrid/sendgrid-nodejs/pull/1011): Bump extend from 3.0.1 to 3.0.2 in /packages/subscription-widget. Thanks to [@dependabot](https://github.com/dependabot)!
- [PR #1012](https://github.com/sendgrid/sendgrid-nodejs/pull/1012): Bump sshpk from 1.13.1 to 1.16.1 in /packages/subscription-widget. Thanks to [@dependabot](https://github.com/dependabot)!
- [PR #1015](https://github.com/sendgrid/sendgrid-nodejs/pull/1015): Bump fstream from 1.0.11 to 1.0.12 in /packages/subscription-widget. Thanks to [@dependabot](https://github.com/dependabot)!
- [PR #1016](https://github.com/sendgrid/sendgrid-nodejs/pull/1016): Bump atob from 2.0.3 to 2.1.2 in /packages/subscription-widget. Thanks to [@dependabot](https://github.com/dependabot)!
- [PR #1018](https://github.com/sendgrid/sendgrid-nodejs/pull/1018): Bump lodash from 4.17.11 to 4.17.15 in /packages/inbound-mail-parser. Thanks to [@dependabot](https://github.com/dependabot)!
- [PR #1014](https://github.com/sendgrid/sendgrid-nodejs/pull/1014): Bump mixin-deep from 1.3.0 to 1.3.2 in /packages/subscription-widget. Thanks to [@dependabot](https://github.com/dependabot)!
- [PR #1017](https://github.com/sendgrid/sendgrid-nodejs/pull/1017): Bump tar from 2.2.1 to 2.2.2 in /packages/subscription-widget. Thanks to [@dependabot](https://github.com/dependabot)!
- [PR #1019](https://github.com/sendgrid/sendgrid-nodejs/pull/1019): Bump stringstream from 0.0.5 to 0.0.6 in /packages/subscription-widget. Thanks to [@dependabot](https://github.com/dependabot)!
- [PR #1026](https://github.com/sendgrid/sendgrid-nodejs/pull/1026): prep the repo for automated releasing. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-05-06] Version 6.4.0
--------------------------
### Added
- [PR #720](https://github.com/sendgrid/sendgrid-nodejs/pull/720): Updated README tags. Big thanks to [Anshul Singhal](https://github.com/af4ro) for the PR!
- [PR #726](https://github.com/sendgrid/sendgrid-nodejs/pull/726): Readability updates. Big thanks to [Anshul Singhal](https://github.com/af4ro) for the PR!
- [PR #728](https://github.com/sendgrid/sendgrid-nodejs/pull/728): Added link to docs from README. Big thanks to [Agnes Jang](https://github.com/agnesjang98) for the PR!
- [PR #490](https://github.com/sendgrid/sendgrid-nodejs/pull/490): Added how to deploy simple hello world app on Azure. Big thanks to [Saras Arya](https://github.com/SarasArya) for the PR!
- [PR #731](https://github.com/sendgrid/sendgrid-nodejs/pull/731): Update USE_CASES.md for Dynamic Templates. Big thanks to [Houssem Yahiaoui](https://github.com/houssem-yahiaoui) for the PR!
- [PR #514](https://github.com/sendgrid/sendgrid-nodejs/pull/514): Allow readable stream as email attachments. Big thanks to [TunedMidja](https://github.com/TunedMidja) for the PR!
- [PR #749](https://github.com/sendgrid/sendgrid-nodejs/pull/749): Update docs to show an example on how to enable tracking settings. Big thanks to [Carlos Henrique Merces Moreira](https://github.com/carloshmm) for the PR!
- [PR #751](https://github.com/sendgrid/sendgrid-nodejs/pull/751): Update README.md to include the CLA. Big thanks to [Bharat Raghunathan](https://github.com/Bharat123rox) for the PR!
- [PR #759](https://github.com/sendgrid/sendgrid-nodejs/pull/759): Add documentation for Email Activity API. Big thanks to [Stuart Reed](https://github.com/reedsa) for the PR!
- [PR #792](https://github.com/sendgrid/sendgrid-nodejs/pull/792): Add inbound parse webhook example. Big thanks to [Ashley Roach](https://github.com/aroach) for the PR!
- [PR #795](https://github.com/sendgrid/sendgrid-nodejs/pull/795): Add first-timers.md file for newcomers. Big thanks to [Dmitriy Danilov](https://github.com/daniloff200) for the PR!
- [PR #768](https://github.com/sendgrid/sendgrid-nodejs/pull/768): Documentation updated for `from` field. Big thanks to [Valerian Pereira](https://github.com/valerianpereira) for the PR!
- [PR #802](https://github.com/sendgrid/sendgrid-nodejs/pull/802): Update OSI code of conduct link. Big thanks to [José Antonio Chio](https://github.com/imagentleman) for the PR!
- [PR #793](https://github.com/sendgrid/sendgrid-nodejs/pull/793): Warn if dynamic template contains non-escaped character. Big thanks to [Stuart Reed](https://github.com/reedsa) for the PR!
- [PR #785](https://github.com/sendgrid/sendgrid-nodejs/pull/785): Updating TROUBLESHOOTING.md with text wrapping example. Big thanks to [Siddhant Sharma](https://github.com/ssiddhantsharma) for the PR!
- [PR #784](https://github.com/sendgrid/sendgrid-nodejs/pull/784): Update docs: specify custom arguments must have string values. Big thanks to [Ishaan Malhi](https://github.com/OrthoDex) for the PR!
- [PR #774](https://github.com/sendgrid/sendgrid-nodejs/pull/774): Run *.md Documents Through Grammerly & Update Accordingly. Big thanks to [Alan Unruh](https://github.com/alanunruh) for the PR!
- [PR #770](https://github.com/sendgrid/sendgrid-nodejs/pull/770): [contact-importer] Update to support @sendgrid/client v6.X. Big thanks to [Zadkiel](https://github.com/aslafy-z) for the PR!
- [PR #767](https://github.com/sendgrid/sendgrid-nodejs/pull/767): Add conformance to style standards. Big thanks to [Tony Ho](https://github.com/tony-ho) for the PR!
- [PR #645](https://github.com/sendgrid/sendgrid-nodejs/pull/645): Clarified how you can change the sender name. Big thanks to [Sundin](https://github.com/Sundin) for the PR!
- [PR #586](https://github.com/sendgrid/sendgrid-nodejs/pull/586): Expanded Travis.yml. Big thanks to [Vivek Iyer](https://github.com/Remorax) for the PR!
- [PR #585](https://github.com/sendgrid/sendgrid-nodejs/pull/585): Updated usage for /categories/stats. Big thanks to [Poschacher Michael](https://github.com/mp-ffx) for the PR!
- [PR #525](https://github.com/sendgrid/sendgrid-nodejs/pull/525): Add statistics helper class. Big thanks to [Devan Patel](https://github.com/devanp92) for the PR!
- [PR #502](https://github.com/sendgrid/sendgrid-nodejs/pull/502): Prevent secrets from sending in email. Big thanks to [Hugo do Carmo](https://github.com/spelcaster) for the PR!
- [PR #488](https://github.com/sendgrid/sendgrid-nodejs/pull/488): Add example use case for Slack event integration. Big thanks to [Mahatthana Nomsawadi](https://github.com/WiNloSt) for the PR!
- [PR #826](https://github.com/sendgrid/sendgrid-nodejs/pull/826): Fixed capitalization for "SendGrid" in Contact the Moderators. Big thanks to [Joe Romeo](https://github.com/JoeRomeo) for the PR!
- [PR #819](https://github.com/sendgrid/sendgrid-nodejs/pull/819): Fix typo in USE_CASES.md. Big thanks to [Byungjin Park](https://github.com/posquit0) for the PR!
- [PR #809](https://github.com/sendgrid/sendgrid-nodejs/pull/809): Properly capitalize "SendGrid" brand. Big thanks to [Zadkiel](https://github.com/aslafy-z) for the PR!
- [PR #804](https://github.com/sendgrid/sendgrid-nodejs/pull/804): Add Event Webhook docker. Big thanks to [Ashley Roach](https://github.com/aroach) for the PR!
- [PR #831](https://github.com/sendgrid/sendgrid-nodejs/pull/831):Add our Developer Experience Engineer career opportunity to the README. Big thanks to [Manjiri Tapaswi](https://github.com/mptap) for the PR!
- [PR #847](https://github.com/sendgrid/sendgrid-nodejs/pull/847): Remove <%body%> from transactional template example. Big thanks to [Ashley Roach](https://github.com/aroach) for the PR!
- [PR #505](https://github.com/sendgrid/sendgrid-nodejs/pull/505): Attachment helper for base64 encoding. Big thanks to [Hugo do Carmo](https://github.com/spelcaster) for the PR!
- [PR #855](https://github.com/sendgrid/sendgrid-nodejs/pull/855): Linter Fixes. 
- [PR #812](https://github.com/sendgrid/sendgrid-nodejs/pull/812): Fix parser constructor error when passing payload. Big thanks to [Felipe](https://github.com/valtlfelipe) for the PR!
- [PR #862](https://github.com/sendgrid/sendgrid-nodejs/pull/862): Fix const data = None; in client/USAGE.md.
- [PR #866](https://github.com/sendgrid/sendgrid-nodejs/pull/866): Not able to get the template list. 
- [PR #803](https://github.com/sendgrid/sendgrid-nodejs/pull/803): Update documentation with new Git workflow. Big thanks to [Tony Ho](https://github.com/tony-ho) for the PR!
- [PR #925](https://github.com/sendgrid/sendgrid-nodejs/pull/925): Twilio Branding and SMS update.

### Fixed
- [PR #735](https://github.com/sendgrid/sendgrid-nodejs/pull/735): Fix outdated careers link. Big thanks to [Ashley Roach](https://github.com/aroach) for the PR!
- [PR #754](https://github.com/sendgrid/sendgrid-nodejs/pull/754): Fix subscription-widget node engine version. Big thanks to [Rafael Almeida](https://github.com/rafaelalmeidatk) for the PR!
- [PR #757](https://github.com/sendgrid/sendgrid-nodejs/pull/757): Upgrade request to 2.88.0 (latest). Big thanks to [Guy Khmelnitsky](https://github.com/GuyKh) for the PR!
- [PR #716](https://github.com/sendgrid/sendgrid-nodejs/pull/716): MailData must have dynamicTemplateData property. Big thanks to [Marat Dyatko](https://github.com/dyatko) for the PR!
- [PR #763](https://github.com/sendgrid/sendgrid-nodejs/pull/): [inbound-mail-parser] fix(deps): Update mailparser to 2.3.4. Big thanks to [Zadkiel](https://github.com/aslafy-z) for the PR!
- [PR #773](https://github.com/sendgrid/sendgrid-nodejs/pull/773): Kubernetes secrets "\n" problem fix. Big thanks to [Daksh](https://github.com/DakshMiglani) for the PR!
- [PR #789](https://github.com/sendgrid/sendgrid-nodejs/pull/789): Correct link for environment variables setup. Big thanks to [PyroclasticMayhem](https://github.com/PyroclasticMayhem) for the PR!
- [PR #780](https://github.com/sendgrid/sendgrid-nodejs/pull/780): v3 send email broken link fixed in TROUBLESHOOTING.md. Big thanks to [Arshad Kazmi](https://github.com/arshadkazmi42) for the PR!
- [PR #779](https://github.com/sendgrid/sendgrid-nodejs/pull/779): Contributing.md broken links fix. Big thanks to [Arshad Kazmi](https://github.com/arshadkazmi42) for the PR!
- [PR #583](https://github.com/sendgrid/sendgrid-nodejs/pull/583): Fix README instructions and replace stray tab indentation by spaces. Big thanks to [Adam Reis](https://github.com/adamreisnz) for the PR!
- [PR #522](https://github.com/sendgrid/sendgrid-nodejs/pull/522): Comma bug in name. Big thanks to [Jordan Tepper](https://github.com/HeroProtagonist) for the PR!
- [PR #824](https://github.com/sendgrid/sendgrid-nodejs/pull/824): Fix Travis CI build failures on main. Big thanks to [Tony Ho](https://github.com/tony-ho) for the PR!
- [PR #798](https://github.com/sendgrid/sendgrid-nodejs/pull/798): Update transactional-templates.md. Big thanks to [Kyle Roberts](https://github.com/kylearoberts) for the PR!

## [6.3.1] - 2018-1-18 ##

This minor version bump was due to a hiccup using `lerna` to publish to npm.

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
- v6.0.0 is a complete rewrite of this SDK for all endpoints. To upgrade from v5.X and lower, we suggest you update your code based on the examples found [here](packages/mail/USE_CASES.md) for mail send and [here](packages/client/USAGE.md) for all other endpoints.
- Please do not hesitate to [open an issue](https://github.com/sendgrid/sendgrid-nodejs/issues) if there are any challenges and/or feedback. [PRs](CONTRIBUTING.md) are also welcome.

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
- Added a [USE_CASES.md](USE_CASES.md) section, with the first use case example for transactional templates

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
- [Troubleshooting](TROUBLESHOOTING.md) section

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
