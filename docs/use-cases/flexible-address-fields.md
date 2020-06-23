## Flexible email address fields
The email address fields (`to`, `from`, `cc`, `bcc`, `replyTo`) are flexible and can be any of the following:

```js
const msg = {

  //Simple email address string
  to: 'someone@example.org',

  //Email address with name
  to: 'Some One <someone@example.org>',

  //Object with name/email
  to: {
    name: 'Some One',
    email: 'someone@example.org',
  },

  //Arrays are supported for to, cc and bcc
  to: [
    'someone@example.org',
    'Some One <someone@example.org>',
    {
      name: 'Some One',
      email: 'someone@example.org',
    },
  ],
};
```
