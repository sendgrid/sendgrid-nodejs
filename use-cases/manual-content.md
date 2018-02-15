# Manually Providing Content

Instead of using the `text` and `html` shorthand properties, you can manually use the `content` property:

```js
const msg = {
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
};
```
