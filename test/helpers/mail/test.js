var assert = require('chai').assert

// Test the minimum required to send an email
describe('helloEmail', function () {
  var helper = require('../../../lib/helpers/mail/mail.js')

  mail = new helper.Mail()
  email = new helper.Email("test@example.com")
  mail.setFrom(email)

  personalization = new helper.Personalization()
  email = new helper.Email("test@example.com")
  personalization.addTo(email)
  mail.addPersonalization(personalization)

  mail.setSubject("Hello World from the SendGrid Node.js Library")

  content = new helper.Content("text/plain", "some text here")
  mail.addContent(content)
  content = new helper.Content("text/html", "<html><body>some text here</body></html>")
  mail.addContent(content)

  test_payload = '{"from":{"email":"test@example.com"},"personalizations":[{"to":[{"email":"test@example.com"}]}],"subject":"Hello World from the SendGrid Node.js Library","content":[{"type":"text/plain","value":"some text here"},{"type":"text/html","value":"<html><body>some text here</body></html>"}]}'

  it('builds the correct payload', function() {
      assert.equal(JSON.stringify(mail.toJSON()), test_payload, 'payload is correct')
  });
})

// Test a fully loaded email payload
describe('kitchenSink', function () {
  var helper = require('../../../lib/helpers/mail/mail.js')

  mail = new helper.Mail()
  email = new helper.Email("test@example.com", "Example User")
  mail.setFrom(email)

  mail.setSubject("Hello World from the SendGrid Node.js Library")

  personalization = new helper.Personalization()
  email = new helper.Email("test@example.com", "Example User")
  personalization.addTo(email)
  email = new helper.Email("test@example.com", "Example User")
  personalization.addTo(email)
  email = new helper.Email("test@example.com", "Example User")
  personalization.addCc(email)
  email = new helper.Email("test@example.com", "Example User")
  personalization.addCc(email)
  email = new helper.Email("test@example.com", "Example User")
  personalization.addBcc(email)
  email = new helper.Email("test@example.com", "Example User")
  personalization.addBcc(email)
  personalization.setSubject("Hello World from the Personalized SendGrid Node.js Library")
  header = new helper.Header("X-Test", "True")
  personalization.addHeader(header)
  header = new helper.Header("X-Test2", "False")
  personalization.addHeader(header)
  substitution = new helper.Substitution("%name%", "Example User")
  personalization.addSubstitution(substitution)
  substitution = new helper.Substitution("%city%", "Denver")
  personalization.addSubstitution(substitution)
  custom_arg = new helper.CustomArgs("timing", "morning")
  personalization.addCustomArg(custom_arg)
  custom_arg = new helper.CustomArgs("type", "marketing")
  personalization.addCustomArg(custom_arg)
  personalization.setSendAt(1443636899)
  mail.addPersonalization(personalization)

  content = new helper.Content("text/plain", "some text here")
  mail.addContent(content)
  content = new helper.Content("text/html", "<html><body>some text here</body></html>")
  mail.addContent(content)
  content = new helper.Content("text/calendar", "Party Time")
  mail.addContent(content)

  attachment = new helper.Attachment()
  attachment.setContent("TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gQ3JhcyBwdW12")
  attachment.setType("application/pdf")
  attachment.setFilename("balance_001.pdf")
  attachment.setDisposition("attachment")
  mail.addAttachment(attachment)

  attachment = new helper.Attachment()
  attachment.setContent("BwdW")
  attachment.setType("image/png")
  attachment.setFilename("banner.png")
  attachment.setDisposition("inline")
  attachment.setContentId("banner")
  mail.addAttachment(attachment)

  mail.setTemplateId("439b6d66-4408-4ead-83de-5c83c2ee313a")

  section = new helper.Section("%section1%", "Textforasubstitutiontagofsection1")
  mail.addSection(section)
  section = new helper.Section("%section2%", "Textforasubstitutiontagofsection2")
  mail.addSection(section)

  header = new helper.Header("X-Test3", "1")
  mail.addHeader(header)
  header = new helper.Header("X-Test4", "2")
  mail.addHeader(header)

  category = new helper.Category("January")
  mail.addCategory(category)
  category = new helper.Category("2015")
  mail.addCategory(category)

  custom_arg = new helper.CustomArgs("timing", "evening")
  mail.addCustomArg(custom_arg)
  custom_arg = new helper.CustomArgs("type", "summer_contest")
  mail.addCustomArg(custom_arg)

  mail.setSendAt(1443636899)

  mail.setBatchId("some_batch_id")

  asm = new helper.Asm(3, [1,4,5])
  mail.setAsm(asm)

  mail.setIpPoolName("23")

  mail_settings = new helper.MailSettings()
  bcc = new helper.Bcc(true, "test@example.com")
  mail_settings.setBcc(bcc)
  footer = new helper.Footer(true, "some footer text", "<html><body>some footer text</body></html>")
  mail_settings.setFooter(footer)
  sandbox_mode = new helper.SandBoxMode(true)
  mail_settings.setSandBoxMode(sandbox_mode)
  spam_check = new helper.SpamCheck(true, 1, "https://gotchya.example.com")
  mail_settings.setSpamCheck(spam_check)
  bypass_list_management = new helper.BypassListManagement(true);
  mail_settings.setBypassListManagement(bypass_list_management);
  mail.addMailSettings(mail_settings)

  tracking_settings = new helper.TrackingSettings()
  click_tracking = new helper.ClickTracking(false, false)
  tracking_settings.setClickTracking(click_tracking)
  open_tracking = new helper.OpenTracking(true, "Optional tag to replace with the open image in the body of the message")
  tracking_settings.setOpenTracking(open_tracking)
  subscription_tracking = new helper.SubscriptionTracking(true, "text to insert into the text/plain portion of the message", "html to insert into the text/html portion of the message", "Optional tag to replace with the open image in the body of the message")
  tracking_settings.setSubscriptionTracking(subscription_tracking)
  ganalytics = new helper.Ganalytics(true, "some utm source", "some utc medium", "some utm term", "some utm content", "some utm campaign")
  tracking_settings.setGanalytics(ganalytics)
  mail.addTrackingSettings(tracking_settings)

  email = new helper.Email("test@example.com", "Example User")
  mail.setReplyTo(email)

  test_payload = '{"from":{"email":"test@example.com","name":"Example User"},"personalizations":[{"to":[{"email":"test@example.com","name":"Example User"},{"email":"test@example.com","name":"Example User"}],"cc":[{"email":"test@example.com","name":"Example User"},{"email":"test@example.com","name":"Example User"}],"bcc":[{"email":"test@example.com","name":"Example User"},{"email":"test@example.com","name":"Example User"}],"subject":"Hello World from the Personalized SendGrid Node.js Library","headers":{"X-Test":"True","X-Test2":"False"},"substitutions":{"%name%":"Example User","%city%":"Denver"},"custom_args":{"timing":"morning","type":"marketing"},"send_at":1443636899}],"subject":"Hello World from the SendGrid Node.js Library","content":[{"type":"text/plain","value":"some text here"},{"type":"text/html","value":"<html><body>some text here</body></html>"},{"type":"text/calendar","value":"Party Time"}],"attachments":[{"content":"TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gQ3JhcyBwdW12","type":"application/pdf","filename":"balance_001.pdf","disposition":"attachment"},{"content":"BwdW","type":"image/png","filename":"banner.png","disposition":"inline","content_id":"banner"}],"template_id":"439b6d66-4408-4ead-83de-5c83c2ee313a","sections":{"%section1%":"Textforasubstitutiontagofsection1","%section2%":"Textforasubstitutiontagofsection2"},"headers":{"X-Test3":"1","X-Test4":"2"},"categories":["January","2015"],"custom_args":{"timing":"evening","type":"summer_contest"},"send_at":1443636899,"batch_id":"some_batch_id","asm":{"group_id":3,"groups_to_display":[1,4,5]},"ip_pool_name":"23","mail_settings":{"bcc":{"enable":true,"email":"test@example.com"},"bypass_list_management":{"enable":true},"footer":{"enable":true,"text":"some footer text","html":"<html><body>some footer text</body></html>"},"sandbox_mode":{"enable":true},"spam_check":{"enable":true,"threshold":1,"post_to_url":"https://gotchya.example.com"}},"tracking_settings":{"click_tracking":{"enable":false,"enable_text":false},"open_tracking":{"enable":true,"substitution_tag":"Optional tag to replace with the open image in the body of the message"},"subscription_tracking":{"enable":true,"text":"text to insert into the text/plain portion of the message","html":"html to insert into the text/html portion of the message","substitution_tag":"Optional tag to replace with the open image in the body of the message"},"ganalytics":{"enable":true,"utm_source":"some utm source","utm_medium":"some utc medium","utm_term":"some utm term","utm_content":"some utm content","utm_campaign":"some utm campaign"}},"reply_to":{"email":"test@example.com","name":"Example User"}}'

  it('builds the correct payload', function() {
      assert.equal(JSON.stringify(mail.toJSON()), test_payload, 'payload is correct')
  });
})
