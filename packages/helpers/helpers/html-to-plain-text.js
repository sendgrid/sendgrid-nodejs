'use strict';


/**
 * Helper to convert an html to a plain text string
 */


module.exports = function convertHTML2PlainString(html) {
  let text = html.replace(/(<([^>]+)>)/g, "");
  text = text.replace(/\s+/g,' ')
  return text
}
