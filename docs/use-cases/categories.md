# Specifying Categories

Use the `categories` property to provide an array of categories for your email:

```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello email with categories',
  html: '<p>Some email content</p>',
  categories: [
    'transactional', 'customer', 'weekly',
  ],
};
```

Specifying a single `category` is also supported:

```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello email with categories',
  html: '<p>Some email content</p>',
  category: 'transactional',
};
```
