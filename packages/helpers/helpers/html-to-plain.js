'use strict';

/**
* Helper to convert html strings to plain text
*/
module.exports = function htmlToPlain(htmlText) {
  return htmlText.replace(/<[^>+]+>/g, '');
};
