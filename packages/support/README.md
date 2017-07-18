## Support classes and helpers for the Sendgrid NodeJS libraries
This is a collection of support classes and helpers used internally by the
Sendgrid NodeJS libraries.

Note that not all objects represented in the Sendgrid API have helper classes assigned to them, because it is not expected that developers will use these classes themselves. They are primarily for internal use and developers are expected to use the publicly exposed API in the various endpoint services.

### Mail class
Used to compose a Mail object that converts itself to proper JSON for use with the Sendgrid API. This class supports a slightly different API to make sending emails easier in many cases by not having to deal with personalization arrays, instead offering a simpler interface for composing mails.

### Attachment class
Used by the inbound mail parser to compose Attachment objects.

### Personalization class
Used by the Mail class to compose Personalization objects.

### Email address
Helper class to represent an email address with name/email. Used by both the Mail and Personalization classes to deal with email addresses of various formats.

### Helpers
Internal helpers that mostly speak for themselves.
