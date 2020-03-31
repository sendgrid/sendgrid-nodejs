# Customization Per Recipient

To send multiple individual emails to multiple recipients with additional customization (like a different subject), use the `personalizations` field as per the [API definition](https://sendgrid.com/docs/API_Reference/api_v3.html) instead of `to`, leveraging all customization options:

```js
const msg = {
  personalizations: [
    {
      to: 'recipient1@example.org',
      subject: 'Hello recipient 1',
      dynamicTemplateData: {
        name: 'Recipient 1',
        id: '123',
      },
      headers: {
        'X-Custom-Header': 'Recipient 1',
      },
      customArgs: {
        myArg: 'Recipient 1', // must be a string
      },
    },
    {
      to: 'recipient2@example.org',
      subject: 'Hello recipient 2',
      dynamicTemplateData: {
        name: 'Recipient 2',
        id: '456',
      },
      headers: {
        'X-Custom-Header': 'Recipient 2',
      },
      customArgs: {
        myArg: 'Recipient 1', // must be a string
      },
      sendAt: 1500077141,
    }
  ],
  from: 'sender@example.org',
  templateId: 'd-12345678901234567890123456789012',
};
```

If the `dynamicTemplateData` field is provided globally as well, these substitutions will be merged with any custom `dynamicTemplateData` you provide in the `personalizations`.
