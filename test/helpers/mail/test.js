var assert = require('chai').assert
var Mail = require('../../../lib/helpers/mail/mail.js').Mail
var Personalization = require('../../../lib/helpers/mail/mail.js').Personalization
var Attachment = require('../../../lib/helpers/mail/mail.js').Attachment
var MailSettings = require('../../../lib/helpers/mail/mail.js').MailSettings
var TrackingSettings = require('../../../lib/helpers/mail/mail.js').TrackingSettings

// Test the minimum required to send an email
describe('helloEmail', function () {
  mail = new Mail('test@example.com', 'Hello World from the SendGrid Node.js Library', 'test@example.com', { type:'text/plain', value:'some text here' })
  mail.addContent([{ type:'text/html', value:'<html><body>some text here</body></html>'}])

  test_payload = '{"from":{"email":"test@example.com"},"personalizations":[{"to":[{"email":"test@example.com"}]}],"subject":"Hello World from the SendGrid Node.js Library","content":[{"type":"text/plain","value":"some text here"},{"type":"text/html","value":"<html><body>some text here</body></html>"}]}'

  it('builds the correct payload', function() {
      assert.equal(JSON.stringify(mail), test_payload, 'payload is correct')
  })
})

//Test a fully loaded email payload
describe('kitchenSink', function () {
  mail = new Mail()
  mail.setFrom('test@example.com', 'DX')

  mail.setSubject('Hello World from the SendGrid Node.js Library')

  personalization = new Personalization()
  personalization.addTo('test@example.com', 'Example User')
  personalization.addTo('test@example.com', 'Example User')
  personalization.addCc('test@example.com', 'Example User')
  personalization.addCc('test@example.com', 'Example User')
  personalization.addBcc('test@example.com', 'Example User')
  personalization.addBcc('test@example.com', 'Example User')
  personalization.setSubject('Hello World from the Personalized SendGrid Node.js Library')
  personalization.addHeader('X-Test', 'True')
  personalization.addHeader('X-Test2', 'False')
  personalization.addSubstitution('%name%', 'Example User')
  personalization.addSubstitution('%city%', 'Denver')
  personalization.addCustomArg('timing', 'morning')
  personalization.addCustomArg('type', 'marketing')
  personalization.setSendAt(1443636899)
  mail.addPersonalization(personalization)

  mail.addContent('some text here', 'text/plain')
  mail.addContent('<html><body>some text here</body></html>', 'text/html')
  mail.addContent('Party Time', 'text/calendar')

  attachment = new Attachment('TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gQ3JhcyBwdW12', 'balance_001.pdf')
  attachment.setType('application/pdf')
  attachment.setDisposition('attachment')
  mail.addAttachment(attachment)

  attachment = new Attachment('BwdW', 'banner.png')
  attachment.setType("image/png")
  attachment.setDisposition("inline")
  attachment.setContentId("banner")
  mail.addAttachment(attachment)

  mail.setTemplateId('439b6d66-4408-4ead-83de-5c83c2ee313a')

  mail.addSection('%section1%', 'Textforasubstitutiontagofsection1')
  mail.addSection('%section2%', 'Textforasubstitutiontagofsection2')

  mail.addHeader('X-Test3', '1')
  mail.addHeader('X-Test4', '2')

  mail.addCategory('January')
  mail.addCategory('2015')

  mail.addCustomArg('timing', 'evening')
  mail.addCustomArg('type', 'summer_contest')

  mail.setSendAt(1443636899)

  mail.setBatchId('some_batch_id')

  mail.setAsm(3, [1,4,5])

  mail.setIpPoolName('23')

  mail_settings = new MailSettings()
  mail_settings.setBcc(true, 'test@example.com')
  mail_settings.setFooter(true, 'some footer text', '<html><body>some footer text</body></html>')
  mail_settings.setSandBoxMode(true)
  mail_settings.setSpamCheck(true, 1, 'https://gotchya.example.com')
  mail.setMailSettings(mail_settings)

  tracking_settings = new TrackingSettings()
  tracking_settings.setClickTracking(false, false)
  tracking_settings.setOpenTracking(true, 'Optional tag to replace with the open image in the body of the message')
  tracking_settings.setSubscriptionTracking(true, 'text to insert into the text/plain portion of the message', 'html to insert into the text/html portion of the message', 'Optional tag to replace with the open image in the body of the message')
  tracking_settings.setGanalytics(true, 'some utm source', 'some utc medium', 'some utm term', 'some utm content', 'some utm campaign')
  mail.setTrackingSettings(tracking_settings)

  mail.setReplyTo('test@example.com', 'DX')

  test_payload = '{"from":{"email":"test@example.com","name":"DX"},"personalizations":[{"to":[{"email":"test@example.com","name":"Example User"},{"email":"test@example.com","name":"Example User"}],"cc":[{"email":"test@example.com","name":"Example User"},{"email":"test@example.com","name":"Example User"}],"bcc":[{"email":"test@example.com","name":"Example User"},{"email":"test@example.com","name":"Example User"}],"subject":"Hello World from the Personalized SendGrid Node.js Library","headers":{"X-Test":"True","X-Test2":"False"},"substitutions":{"%name%":"Example User","%city%":"Denver"},"custom_args":{"timing":"morning","type":"marketing"},"send_at":1443636899}],"subject":"Hello World from the SendGrid Node.js Library","content":[{"type":"text/plain","value":"some text here"},{"type":"text/html","value":"<html><body>some text here</body></html>"},{"type":"text/calendar","value":"Party Time"}],"attachments":[{"content":"TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gQ3JhcyBwdW12","filename":"balance_001.pdf","type":"application/pdf","disposition":"attachment"},{"content":"BwdW","filename":"banner.png","type":"image/png","disposition":"inline","content_id":"banner"}],"template_id":"439b6d66-4408-4ead-83de-5c83c2ee313a","sections":{"%section1%":"Textforasubstitutiontagofsection1","%section2%":"Textforasubstitutiontagofsection2"},"headers":{"X-Test3":"1","X-Test4":"2"},"categories":["January","2015"],"custom_args":{"timing":"evening","type":"summer_contest"},"send_at":1443636899,"batch_id":"some_batch_id","asm":{"group_id":3,"groups_to_display":[1,4,5]},"ip_pool_name":"23","mail_settings":{"bcc":{"enable":true,"email":"test@example.com"},"footer":{"enable":true,"text":"some footer text","html":"<html><body>some footer text</body></html>"},"sandbox_mode":{"enable":true},"spam_check":{"enable":true,"threshold":1,"post_to_url":"https://gotchya.example.com"}},"tracking_settings":{"click_tracking":{"enable":false,"enable_text":false},"open_tracking":{"enable":true,"substitution_tag":"Optional tag to replace with the open image in the body of the message"},"subscription_tracking":{"enable":true,"text":"text to insert into the text/plain portion of the message","html":"html to insert into the text/html portion of the message","substitution_tag":"Optional tag to replace with the open image in the body of the message"},"ganalytics":{"enable":true,"utm_source":"some utm source","utm_medium":"some utc medium","utm_term":"some utm term","utm_content":"some utm content","utm_campaign":"some utm campaign"}},"reply_to":{"email":"test@example.com","name":"DX"}}'

  it('builds the correct payload', function() {
      assert.equal(JSON.stringify(mail), test_payload, 'payload is correct')
  })
})