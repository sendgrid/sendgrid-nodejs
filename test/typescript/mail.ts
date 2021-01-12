import { Client } from "@sendgrid/client";
import sgMail = require("@sendgrid/mail");

// Test setApiKey() method
sgMail.setApiKey("MY_SENDGRID_API_KEY");

// Test setClient() method
sgMail.setClient(new Client());

// Test setSubstitutionWrappers() method
sgMail.setSubstitutionWrappers("{{", "}}")

// Test send() method
sgMail.send({
  from: "someone@example.org",
  to: "Some One <someone@example.org>",
  cc: { name: "Some One", email: "someone@example.org" },
  subject: "Test Email",
  text: "This is a test email",
  html: "<p>This is a test email</p>"
}).then(result => {
  console.log("Sent email");
}, err => {
  console.error(err);
});

sgMail.send({
  from: "someone@example.org",
  to: "Some One <someone@example.org>",
  cc: { name: "Some One", email: "someone@example.org" },
  subject: "Test Email",
  text: "This is a test email",
  html: "<p>This is a test email</p>"
}, false, (err) => {
  if(err) console.error(err);
  else console.log("Sent email");
});

// Test sendMultiple() method
sgMail.sendMultiple({
  from: "someone@example.org",
  to: [
    "Some One <someone@example.org>",
    { name: "Some One", email: "someone@example.org" }
  ],
  cc: { name: "Some One", email: "someone@example.org" },
  subject: "Test Email",
  text: "This is a test email",
  html: "<p>This is a test email</p>"
}).then(result => {
  console.log("Sent email");
}, err => {
  console.error(err);
});

sgMail.sendMultiple({
  from: "someone@example.org",
  to: [
    "Some One <someone@example.org>",
    { name: "Some One", email: "someone@example.org" }
  ],
  cc: { name: "Some One", email: "someone@example.org" },
  subject: "Test Email",
  text: "This is a test email",
  html: "<p>This is a test email</p>"
}, (err) => {
  if(err) console.error(err);
  else console.log("Sent email");
});

// Examples from the USE_CASES.md file
sgMail.send({
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
});

sgMail.send({
  to: ['recipient1@example.org', 'recipient2@example.org'],
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
});

sgMail.sendMultiple({
  to: ['recipient1@example.org', 'recipient2@example.org'],
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
});

sgMail.send({
  to: 'recipient@example.org',
  cc: 'someone@example.org',
  bcc: ['me@example.org', 'you@example.org'],
  from: 'sender@example.org',
  replyTo: 'othersender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
});

sgMail.send([
  {
    to: 'recipient1@example.org',
    from: 'sender@example.org',
    subject: 'Hello recipient 1',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
  },
  {
    to: 'recipient2@example.org',
    from: 'other-sender@example.org',
    subject: 'Hello recipient 2',
    text: 'Hello other plain world!',
    html: '<p>Hello other HTML world!</p>',
  },
]);

sgMail.send({
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  templateId: '13b8f94f-bcae-4ec6-b752-70d6cb59f932',
  substitutions: {
    name: 'Some One',
    city: 'Denver',
  },
});

sgMail.send({
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello attachment',
  html: '<p>Here’s an attachment for you!</p>',
  attachments: [
    {
      content: 'Some base 64 encoded attachment content',
      filename: 'some-attachment.txt',
      type: 'plain/text',
      disposition: 'attachment',
      contentId: 'mytext'
    },
  ],
});

sgMail.send({
  personalizations: [
    {
      to: 'recipient1@example.org',
      subject: 'Hello recipient 1',
      substitutions: {
        name: 'Recipient 1',
        id: '123',
      },
      headers: {
        'X-Custom-Header': 'Recipient 1',
      },
      customArgs: {
        myArg: 'Recipient 1',
      },
    },
    {
      to: 'recipient2@example.org',
      subject: 'Hello recipient 2',
      substitutions: {
        name: 'Recipient 2',
        id: '456',
      },
      headers: {
        'X-Custom-Header': 'Recipient 2',
      },
      customArgs: {
        myArg: 'Recipient 1',
      },
      sendAt: 1500077141,
    }
  ],
  from: 'sender@example.org',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
});

sgMail.send({
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello manual content',
  content: [
    {
      type: 'text/html',
      value: '<p>Hello HTML world!</p>',
    },
    {
      type: 'text/plain',
      value: 'Hello plain world!',
    },
  ],
});

sgMail.send({
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello custom header',
  html: '<p>Some email content</p>',
  headers: {
    'X-CustomHeader': 'Custom header value',
  },
});

sgMail.send({
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello delayed email',
  html: '<p>Some email content</p>',
  sendAt: 1500077141,
});

sgMail.send({
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello email with categories',
  html: '<p>Some email content</p>',
  categories: [
    'transactional', 'customer', 'weekly',
  ],
});

sgMail.send({
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello email with categories',
  html: '<p>Some email content</p>',
  category: 'transactional',
});

sgMail.send({
  to: 'recipient@example.org',
  cc: 'someone@example.org',
  bcc: ['me@example.org', 'you@example.org'],
  from: 'sender@example.org',
  replyTo: 'othersender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  templateId: 'sendgrid-template-id',
  substitutionWrappers: ['{{', '}}'],
  substitutions: {
    name: 'Some One',
    id: '123',
  },
  attachments: [
    {
      content: 'Some attachment content',
      filename: 'some-attachment.txt',
    },
  ],
  categories: ['Transactional', 'My category'],
  sendAt: 1500077141,
  headers: {
    'X-CustomHeader': 'Custom header value',
  },
  sections: {},
  customArgs: {
    myCustomArg: 123,
  },
  batchId: 'sendgrid-batch-id',
  asm: {
    groupId: 1
  },
  ipPoolName: 'sendgrid-ip-pool-name',
  mailSettings: {},
  trackingSettings: {},
});