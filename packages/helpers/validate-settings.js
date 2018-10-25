'use strict';

const validate = (parent, parentName, childName, childType) => {
  if (typeof parent === 'undefined' || typeof parent[childName] === 'undefined') {
    return;
  }
  if (typeof parent[childName] !== childType) {
    throw new Error(`${childType} expected for \`${parentName}.${childName}\``)
  }
};

module.exports = {
  validateMailSettings(settings) {
    if (typeof settings !== 'object') {
      throw new Error('Object expected for `mailSettings`');
    }
    const {
      bcc,
      bypassListManagement,
      footer,
      sandboxMode,
      spamCheck,
    } = settings;
    validate(bcc, 'bcc', 'enable', 'boolean');
    validate(bcc, 'bcc', 'email', 'string');
    validate(bypassListManagement, 'bypassListManagement', 'enable', 'boolean');
    validate(footer, 'footer', 'enable', 'boolean');
    validate(footer, 'footer', 'text', 'string');
    validate(footer, 'footer', 'html', 'string');
    validate(sandboxMode, 'sandboxMode', 'enable', 'boolean');
    validate(spamCheck, 'spamCheck', 'enable', 'boolean');
    validate(spamCheck, 'spamCheck', 'threshold', 'number');
    validate(spamCheck, 'spamCheck', 'postToUrl', 'string');
  },

};
