/**
 * Helper to convert an html to a plain text string
 */


function convertHTML2PlainString(html) {
  let text = html.replace(/(<([^>]+)>)/g, " ");
  text = text.replace(/\s+/g,' ')
  return text
}
