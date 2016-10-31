'use strict';
// Please see examples/helpers/mail/example.js for an usage example

function Attachment(content, filename) {
  this.content = content;
  this.filename = filename;
}

Attachment.prototype.setType = function(type) {
  return this.type = type;
};

Attachment.prototype.setDisposition = function(disposition) {
  return this.disposition = disposition;
};

Attachment.prototype.setContentId = function(content_id) {
  return this.content_id = content_id;
};

function MailSettings() { }

MailSettings.prototype.setBcc = function(enable, email) {
  return this.bcc = {
    enable: enable,
    email: email
  };
};

MailSettings.prototype.setFooter = function(enable, text, html) {
  return this.footer = {
    enable: enable,
    text: text,
    html: html
  };
};

MailSettings.prototype.setSandBoxMode = function(enable) {
  return this.sandbox_mode = {
    enable: enable
  };
};

MailSettings.prototype.setSpamCheck = function(enable, threshold, post_to_url) {
  return this.spam_check = {
    enable: enable,
    threshold: threshold,
    post_to_url: post_to_url
  };
};

function TrackingSettings() { }

TrackingSettings.prototype.setClickTracking = function(enable, enable_text) {
  return this.click_tracking = {
    enable: enable,
    enable_text: enable_text
  };
};

TrackingSettings.prototype.setOpenTracking = function(enable, substitution_tag) {
  return this.open_tracking = {
    enable: enable,
    substitution_tag: substitution_tag
  };
};

TrackingSettings.prototype.setSubscriptionTracking = function(enable, text, html, substitution_tag) {
  return this.subscription_tracking = {
    enable: enable,
    text: text,
    html: html,
    substitution_tag: substitution_tag
  };
};

TrackingSettings.prototype.setGanalytics = function(enable, utm_source, utm_medium, utm_term, utm_content, utm_campaign) {
  return this.ganalytics = {
    enable: enable,
    utm_source: utm_source,
    utm_medium: utm_medium,
    utm_term: utm_term,
    utm_content: utm_content,
    utm_campaign: utm_campaign
  };
};

function Personalization() { }

Personalization.prototype.addTo = function(email, name) {
  if (!this.to) {
    this.to = [];
  }
  return this.to.push(createEmailObject(email, name));
};

Personalization.prototype.addCc = function(email, name) {
  if (!this.cc) {
    this.cc = [];
  }
  return this.cc.push(createEmailObject(email, name));
};

Personalization.prototype.addBcc = function(email, name) {
  if (!this.bcc) {
    this.bcc = [];
  }
  return this.bcc.push(createEmailObject(email, name));
};

Personalization.prototype.setSubject = function(subject) {
  return this.subject = subject;
};

Personalization.prototype.addHeader = function(key, value) {
  if (!this.headers) {
    this.headers = {};
  }
  return this.headers[key] = value;
};

Personalization.prototype.addSubstitution = function(key, value) {
  if (!this.substitutions) {
    this.substitutions = {};
  }
  return this.substitutions[key] = value;
};

Personalization.prototype.addCustomArg = function(key, value) {
  if (!this.custom_args) {
    this.custom_args = {};
  }
  return this.custom_args[key] = value;
};

Personalization.prototype.setSendAt = function(send_at) {
  return this.send_at = send_at;
};

function Mail(from_email, subject, to_email, content) {
  this.from = {};
  this.personalizations = [];
  this.subject = '';
  this.content = [];

  this.setFrom(from_email);
  this.setSubject(subject);
  if (to_email) {
    this.addTo(to_email);
  }
  if (content) {
    this.addContent(content);
  }
}

Mail.prototype.addPersonalization = function(personalization) {
  return this.personalizations.push(personalization);
};

Mail.prototype.addTo = function(email, name) {
  return this.personalizations.push({ to: [createEmailObject(email, name)]});
};

Mail.prototype.addCc = function(email, name) {
  return this.personalizations.push({ cc: [createEmailObject(email, name)]});
};

Mail.prototype.addBcc = function(email, name) {
  return this.personalizations.push({ bcc: [createEmailObject(email, name)]});
};

Mail.prototype.setFrom = function(email, name) {
  return this.from = createEmailObject(email, name);
};

Mail.prototype.setReplyTo = function(email, name) {
  return this.reply_to = createEmailObject(email, name);
};

Mail.prototype.setSubject = function(subject) {
  return this.subject = subject;
};

Mail.prototype.addContent = function(content, type) {
  if (Array.isArray(content)) {
    return this.content = this.content.concat(content);
  }
  if (typeof content === 'string') {
    content = {
      type: type || 'text/plain',
      value: content
    };
  }
  return this.content.push(content);
};

Mail.prototype.addAttachment = function(attachment) {
  if (!this.attachments) {
    this.attachments = [];
  }
  this.attachments.push(attachment);
};

Mail.prototype.setTemplateId = function(template_id) {
  this.template_id = template_id;
};

Mail.prototype.addSection = function(key, value) {
  if (!this.sections) {
    this.sections = {};
  }
  return this.sections[key] = value;
};

Mail.prototype.addHeader = function(key, value) {
  if (!this.headers) {
    this.headers = {};
  }
  return this.headers[key] = value;
};

Mail.prototype.addCategory = function(category) {
  if (!this.categories) {
    this.categories = [];
  }
  return this.categories.push(category);
};

Mail.prototype.addCustomArg = function(key, value) {
  if (!this.custom_args) {
    this.custom_args = {};
  }
  return this.custom_args[key] = value;
};

Mail.prototype.setSendAt = function(send_at) {
  return this.send_at = send_at;
};

Mail.prototype.setBatchId = function(batch_id) {
  return this.batch_id = batch_id;
};

Mail.prototype.setAsm = function(group_id, groups_to_display) {
  if (!this.asm) {
    this.asm = {
      group_id: group_id
    };
    if (groups_to_display) {
      this.asm.groups_to_display = groups_to_display;
    }
  }
};

Mail.prototype.setIpPoolName = function(ip_pool_name) {
  return this.ip_pool_name = ip_pool_name;
};

Mail.prototype.setMailSettings = function(mail_settings) {
  this.mail_settings = mail_settings;
};

Mail.prototype.setTrackingSettings = function(tracking_settings) {
  this.tracking_settings = tracking_settings;
};

function createEmailObject(email, name) {
  if (typeof email === 'string') {
    email = { email: email };
    if (name) {
      email.name = name;
    }
  }
  return email;
}

module.exports = {
  Attachment: Attachment,
  Mail: Mail,
  MailSettings: MailSettings,
  Personalization: Personalization,
  TrackingSettings: TrackingSettings
};
