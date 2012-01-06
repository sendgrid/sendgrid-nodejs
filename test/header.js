var assert = require('assert'),
    header = require('../lib/header');

exports.main = function() {
  h = new header.Header();
  h.addTo('example@example.com');
  assert.ok(h.toJson() == '{"to": ["example@example.com"]}');
  
  h.addTo(['example1@example.com', 'example2@example.com']);
  assert.ok(h.toJson() == '{"to": ["example@example.com","example1@example.com","example2@example.com"]}');
  
  h.addSubVal('[name]', ['Name 1', 'Name 2']);
  assert.ok(h.toJson() == '{"to": ["example@example.com","example1@example.com","example2@example.com"],"sub":{"[name]":["Name 1","Name 2"]}}');

  h.setUniqueArgs(['Arg 1', 'Arg 2']);
  assert.ok(h.toJson() == '{"to": ["example@example.com","example1@example.com","example2@example.com"],"sub":{"[name]":["Name 1","Name 2"]},"unique_args":["Arg 1","Arg 2"]}');

  h.setCategory('Category');
  assert.ok(h.toJson() == '{"to": ["example@example.com","example1@example.com","example2@example.com"],"sub":{"[name]":["Name 1","Name 2"]},"unique_args":["Arg 1","Arg 2"],"category":"Category"}');

  h.addFilterSetting('unsubscribe', 'enable', '1');
  assert.ok(h.toJson() == '{"to": ["example@example.com","example1@example.com","example2@example.com"],"sub":{"[name]":["Name 1","Name 2"]},"unique_args":["Arg 1","Arg 2"],"category":"Category","filters":{"unsubscribe":{"settings":{"enable":"1"}}}}');
}

exports.main();