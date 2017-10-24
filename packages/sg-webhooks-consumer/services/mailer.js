const config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendGridApiKey);

module.exports = (surveyData, surveyId) => {
  const recipients = surveyData.recipients.split(',').map(email => email.trim());
  const personalizations = surveyData.recipients.split(",").map(email => {
    email = email.trim();
    return {
      to: email,
      substitutions: {
        email: email
      }
    }
  });
  const msg = {
    personalizations,
    from: 'Emaily <no-reply@emaily.com>',
    subject: surveyData.subject,
    substitutionWrappers: ['{{', '}}'],
    templateId: config.sendGridTemplateId,
    substitutions: {
      hostName: config.hostName,
      heading: surveyData.heading,
      surveyId
    }
  };
  return sgMail.sendMultiple(msg);
}
