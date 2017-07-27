'use strict';
// This helper builds the request body for the v3 mail/send endpoint
// Please see examples/helpers/mail/example.js for an usage example

function ClickTracking(enable, enable_text) {
  this.enable = enable;
  this.enable_text = enable_text;

  this.setEnable = function(enable) {
    this.enable = enable;
  };

  this.getEnable = function() {
    return this.enable;
  };

  this.setEnableText = function(enable_text) {
    this.enable_text = enable_text;
  };

  this.getEnableText = function() {
    return this.enable_text;
  };

  this.toJSON = function() {
    var json = {
      enable: this.getEnable(),
      enable_text: this.getEnableText(),
    };
    return json;
  };

  return this;
}

function OpenTracking(enable, substitution_tag) {
  this.enable = enable;
  this.substitution_tag = substitution_tag;

  this.setEnable = function(enable) {
    this.enable = enable;
  };

  this.getEnable = function() {
    return this.enable;
  };

  this.setSubscriptionTag = function(substitution_tag) {
    this.substitution_tag = substitution_tag;
  };

  this.getSubscriptionTag = function() {
    return this.substitution_tag;
  };

  this.toJSON = function() {
    var json = {
      enable: this.getEnable(),
      substitution_tag: this.getSubscriptionTag(),
    };
    return json;
  };

  return this;
}

function SubscriptionTracking(enable, text, html, substitution_tag) {
  this.enable = enable;
  this.text = text;
  this.html = html;
  this.substitution_tag = substitution_tag;

  this.setEnable = function(enable) {
    this.enable = enable;
  };

  this.getEnable = function() {
    return this.enable;
  };

  this.setText = function(text) {
    this.text = text;
  };

  this.getText = function() {
    return this.text;
  };

  this.setHtml = function(html) {
    this.html = html;
  };

  this.getHtml = function() {
    return this.html;
  };

  this.setSubstitutionTag = function(substitution_tag) {
    this.substitution_tag = substitution_tag;
  };

  this.getSubstitutionTag = function() {
    return this.substitution_tag;
  };

  this.toJSON = function() {
    var json = {
      enable: this.getEnable(),
      text: this.getText(),
      html: this.getHtml(),
      substitution_tag: this.getSubstitutionTag(),
    };
    return json;
  };

  return this;
}

function Ganalytics(
  enable, utm_source, utm_medium, utm_term, utm_content, utm_campaign
) {
  this.enable = enable;
  this.utm_source = utm_source;
  this.utm_medium = utm_medium;
  this.utm_term = utm_term;
  this.utm_content = utm_content;
  this.utm_campaign = utm_campaign;

  this.setEnable = function(enable) {
    this.enable = enable;
  };

  this.getEnable = function() {
    return this.enable;
  };

  this.setUtmSource = function(utm_source) {
    this.utm_source = utm_source;
  };

  this.getUtmSource = function() {
    return this.utm_source;
  };

  this.setUtmMedium = function(utm_medium) {
    this.utm_medium = utm_medium;
  };

  this.getUtmMedium = function() {
    return this.utm_medium;
  };

  this.setUtmTerm = function(utm_term) {
    this.utm_term = utm_term;
  };

  this.getUtmTerm = function() {
    return this.utm_term;
  };

  this.setUtmContent = function(utm_content) {
    this.utm_content = utm_content;
  };

  this.getUtmContent = function() {
    return this.utm_content;
  };

  this.setUtmCampaign = function(utm_campaign) {
    this.utm_campaign = utm_campaign;
  };

  this.getUtmCampaign = function() {
    return this.utm_campaign;
  };

  this.toJSON = function() {
    var json = {
      enable: this.getEnable(),
      utm_source: this.getUtmSource(),
      utm_medium: this.getUtmMedium(),
      utm_term: this.getUtmTerm(),
      utm_content: this.getUtmContent(),
      utm_campaign: this.getUtmCampaign(),
    };
    return json;
  };

  return this;
}

function TrackingSettings() {
  this.click_tracking = undefined;
  this.open_tracking = undefined;
  this.subscription_tracking = undefined;
  this.ganalytics = undefined;

  this.setClickTracking = function(click_tracking) {
    this.click_tracking = click_tracking;
  };

  this.getClickTracking = function() {
    return this.click_tracking;
  };

  this.setOpenTracking = function(open_tracking) {
    this.open_tracking = open_tracking;
  };

  this.getOpenTracking = function() {
    return this.open_tracking;
  };

  this.setSubscriptionTracking = function(subscription_tracking) {
    this.subscription_tracking = subscription_tracking;
  };

  this.getSubscriptionTracking = function() {
    return this.subscription_tracking;
  };

  this.setGanalytics = function(ganalytics) {
    this.ganalytics = ganalytics;
  };

  this.getGanalytics = function() {
    return this.ganalytics;
  };

  this.toJSON = function() {
    var json = {
      click_tracking: this.getClickTracking(),
      open_tracking: this.getOpenTracking(),
      subscription_tracking: this.getSubscriptionTracking(),
      ganalytics: this.getGanalytics(),
    };
    return json;
  };

  return this;
}

function Bcc(enable, email) {
  this.enable = enable;
  this.email = email;

  this.setEnable = function(enable) {
    this.enable = enable;
  };

  this.getEnable = function() {
    return this.enable;
  };

  this.setEmail = function(email) {
    this.email = email;
  };

  this.getEmail = function() {
    return this.email;
  };

  this.toJSON = function() {
    var json = {
      enable: this.getEnable(),
      email: this.getEmail(),
    };
    return json;
  };

  return this;
}

function BypassListManagement(enable) {
  this.enable = enable;

  var json = {
    enable: this.enable,
  };

  return json;
}

function Footer(enable, text, html) {
  this.enable = enable;
  this.text = text;
  this.html = html;

  this.setEnable = function(enable) {
    this.enable = enable;
  };

  this.getEnable = function() {
    return this.enable;
  };

  this.setText = function(text) {
    this.text = text;
  };

  this.getText = function() {
    return this.text;
  };

  this.setHtml = function(html) {
    this.html = html;
  };

  this.getHtml = function() {
    return this.html;
  };

  this.toJSON = function() {
    var json = {
      enable: this.getEnable(),
      text: this.getText(),
      html: this.getHtml(),
    };
    return json;
  };

  return this;
}

function SandBoxMode(enable) {
  this.enable = enable;

  var json = {
    enable: this.enable,
  };

  return json;
}

function SpamCheck(enable, threshold, post_to_url) {
  this.enable = enable;
  this.threshold = threshold;
  this.post_to_url = post_to_url;

  this.setEnable = function(enable) {
    this.enable = enable;
  };

  this.getEnable = function() {
    return this.enable;
  };

  this.setThreshold = function(threshold) {
    this.threshold = threshold;
  };

  this.getThreshold = function() {
    return this.threshold;
  };

  this.setPostToUrl = function(post_to_url) {
    this.post_to_url = post_to_url;
  };

  this.getPostToUrl = function() {
    return this.post_to_url;
  };

  this.toJSON = function() {
    var json = {
      enable: this.getEnable(),
      threshold: this.getThreshold(),
      post_to_url: this.getPostToUrl(),
    };
    return json;
  };

  return this;
}

function MailSettings() {
  this.bcc = undefined;
  this.bypass_list_management = undefined;
  this.footer = undefined;
  this.sandbox_mode = undefined;
  this.spam_check = undefined;

  this.setBcc = function(bcc) {
    this.bcc = bcc;
  };

  this.getBcc = function() {
    return this.bcc;
  };

  this.setBypassListManagement = function(bypass_list_management) {
    this.bypass_list_management = bypass_list_management;
  };

  this.getBypassListManagement = function() {
    return this.bypass_list_management;
  };

  this.setFooter = function(footer) {
    this.footer = footer;
  };

  this.getFooter = function() {
    return this.footer;
  };

  this.setSandBoxMode = function(sandbox_mode) {
    this.sandbox_mode = sandbox_mode;
  };

  this.getSandBoxMode = function() {
    return this.sandbox_mode;
  };

  this.setSpamCheck = function(spam_check) {
    this.spam_check = spam_check;
  };

  this.getSpamCheck = function() {
    return this.spam_check;
  };

  this.toJSON = function() {
    var json = {
      bcc: this.getBcc(),
      bypass_list_management: this.getBypassListManagement(),
      footer: this.getFooter(),
      sandbox_mode: this.getSandBoxMode(),
      spam_check: this.getSpamCheck(),
    };
    return json;
  };

  return this;
}

function Attachment() {
  this.content = undefined;
  this.type = undefined;
  this.filename = undefined;
  this.disposition = undefined;
  this.content_id = undefined;

  this.setContent = function(content) {
    this.content = content;
  };

  this.getContent = function() {
    return this.content;
  };

  this.setType = function(type) {
    this.type = type;
  };

  this.getType = function() {
    return this.type;
  };

  this.setFilename = function(filename) {
    this.filename = filename;
  };

  this.getFilename = function() {
    return this.filename;
  };

  this.setDisposition = function(disposition) {
    this.disposition = disposition;
  };

  this.getDisposition = function() {
    return this.disposition;
  };

  this.setContentId = function(content_id) {
    this.content_id = content_id;
  };

  this.getContentId = function() {
    return this.content_id;
  };

  this.toJSON = function() {
    var json = {
      content: this.getContent(),
      type: this.getType(),
      filename: this.getFilename(),
      disposition: this.getDisposition(),
      content_id: this.getContentId(),
    };
    return json;
  };

  return this;
}

function Asm(group_id, groups_to_display) {
  this.group_id = group_id;
  this.groups_to_display = groups_to_display;

  var json = {
    group_id: this.group_id,
    groups_to_display: this.groups_to_display,
  };

  return json;
}

function Category(name) {
  this.category = name;

  var json = {
    category: this.category,
  };

  return json;
}

function CustomArgs(key, value) {
  this.key = key;
  this.value = value;

  var json = {};
  json[this.key] = this.value;

  return json;
}

function Substitution(key, value) {
  this.key = key;
  this.value = value;

  var json = {};
  json[this.key] = this.value;

  return json;
}

function Section(key, value) {
  this.key = key;
  this.value = value;

  var json = {};
  json[this.key] = this.value;

  return json;
}

function Header(key, value) {
  this.key = key;
  this.value = value;

  var json = {};
  json[this.key] = this.value;

  return json;
}

function Personalization() {
  this.tos = undefined;
  this.ccs = undefined;
  this.bccs = undefined;
  this.subject = undefined;
  this.headers = undefined;
  this.substitutions = undefined;
  this.custom_args = undefined;
  this.send_at = undefined;

  this.addTo = function(email) {
    if (this.tos === undefined) {
      this.tos = [];
    }
    this.tos.push(email);
  };

  this.getTos = function() {
    return this.tos;
  };

  this.addCc = function(email) {
    if (this.ccs === undefined) {
      this.ccs = [];
    }
    this.ccs.push(email);
  };

  this.getCcs = function() {
    return this.ccs;
  };

  this.addBcc = function(email) {
    if (this.bccs === undefined) {
      this.bccs = [];
    }
    this.bccs.push(email);
  };

  this.getBccs = function() {
    return this.bccs;
  };

  this.setSubject = function(subject) {
    this.subject = subject;
  };

  this.getSubject = function() {
    return this.subject;
  };

  this.addHeader = function(header) {
    if (this.headers === undefined) {
      this.headers = {};
    }
    this.headers[Object.keys(header)[0]] = header[Object.keys(header)[0]];
  };

  this.getHeaders = function() {
    return this.headers;
  };

  this.addSubstitution = function(substitution) {
    if (this.substitutions === undefined) {
      this.substitutions = {};
    }
    var currentKey = Object.keys(substitution)[0];
    var currentVal = substitution[currentKey];
    if (currentVal === null || typeof currentVal === 'undefined') {
      this.substitutions[currentKey] = '';
    }
    else {
      this.substitutions[currentKey] = currentVal.toString();
    }
  };

  this.getSubstitutions = function() {
    return this.substitutions;
  };

  this.addCustomArg = function(custom_arg) {
    if (this.custom_args === undefined) {
      this.custom_args = {};
    }
    this.custom_args[Object.keys(custom_arg)[0]] =
      custom_arg[Object.keys(custom_arg)[0]];
  };

  this.getCustomArgs = function() {
    return this.custom_args;
  };

  this.setSendAt = function(send_at) {
    this.send_at = send_at;
  };

  this.getSendAt = function() {
    return this.send_at;
  };

  this.toJSON = function() {
    var json = {
      to: this.getTos(),
      cc: this.getCcs(),
      bcc: this.getBccs(),
      subject: this.getSubject(),
      headers: this.getHeaders(),
      substitutions: this.getSubstitutions(),
      custom_args: this.getCustomArgs(),
      send_at: this.getSendAt(),
    };
    return json;
  };

  return this;
}

function Content(type, value) {
  this.type = type;
  this.value = value;

  var json = {
    type: this.type,
    value: this.value,
  };

  return json;
}

function Email(email, name) {
  this.name = name;
  this.email = email;

  var json = {
    email: this.email,
    name: this.name,
  };

  return json;
}

// This represents the full request body for a v3 /mail/send/
function Mail(from_email, subject, to_email, content) {
  this.from_email = undefined;
  this.personalizations = undefined;
  this.subject = undefined;
  this.contents = undefined;
  this.attachments = undefined;
  this.template_id = undefined;
  this.sections = undefined;
  this.headers = undefined;
  this.categories = undefined;
  this.send_at = undefined;
  this.batch_id = undefined;
  this.asm = undefined;
  this.ip_pool_name = undefined;
  this.mail_settings = undefined;
  this.reply_to = undefined;

  this.setFrom = function(email) {
    this.from_email = email;
  };

  this.getFrom = function() {
    return this.from_email;
  };

  this.addPersonalization = function(personalization) {
    if (this.personalizations === undefined) {
      this.personalizations = [];
    }
    this.personalizations.push(personalization);
  };
  // This array must be JSON compatible with the raw sendgrid request 
  this.getPersonalizations = function() {
    return this.personalizations.map(function(personalization) {
       return personalization.toJSON();
    });
  };

  this.setSubject = function(subject) {
    this.subject = subject;
  };

  this.getSubject = function() {
    return this.subject;
  };

  this.addContent = function(content) {
    if (this.contents === undefined) {
      this.contents = [];
    }
    this.contents.push(content);
  };

  this.getContents = function() {
    return this.contents;
  };

  this.addAttachment = function(attachment) {
    if (this.attachments === undefined) {
      this.attachments = [];
    }
    this.attachments.push(attachment);
  };

  this.getAttachments = function() {
    return this.attachments;
  };

  this.setTemplateId = function(template_id) {
    this.template_id = template_id;
  };

  this.getTemplateId = function() {
    return this.template_id;
  };

  this.addSection = function(section) {
    if (this.sections === undefined) {
      this.sections = {};
    }
    this.sections[Object.keys(section)[0]] = section[Object.keys(section)[0]];
  };

  this.getSections = function() {
    return this.sections;
  };

  this.addHeader = function(header) {
    if (this.headers === undefined) {
      this.headers = {};
    }
    this.headers[Object.keys(header)[0]] = header[Object.keys(header)[0]];
  };

  this.getHeaders = function() {
    return this.headers;
  };

  this.addCategory = function(category) {
    if (this.categories === undefined) {
      this.categories = [];
    }
    this.categories.push(category.category);
  };

  this.getCategories = function() {
    return this.categories;
  };

  this.addCustomArg = function(custom_arg) {
    if (this.custom_args === undefined) {
      this.custom_args = {};
    }
    this.custom_args[Object.keys(custom_arg)[0]] =
      custom_arg[Object.keys(custom_arg)[0]];
  };

  this.getCustomArgs = function() {
    return this.custom_args;
  };

  this.setSendAt = function(send_at) {
    this.send_at = send_at;
  };

  this.getSendAt = function() {
    return this.send_at;
  };

  this.setBatchId = function(batch_id) {
    this.batch_id = batch_id;
  };

  this.getBatchId = function() {
    return this.batch_id;
  };

  this.setAsm = function(asm) {
    this.asm = asm;
  };

  this.getAsm = function() {
    return this.asm;
  };

  this.setIpPoolName = function(ip_pool_name) {
    this.ip_pool_name = ip_pool_name;
  };

  this.getIpPoolName = function() {
    return this.ip_pool_name;
  };

  this.addMailSettings = function(mail_settings) {
    this.mail_settings = mail_settings;
  };

  this.getMailSettings = function() {
    return this.mail_settings;
  };

  this.addTrackingSettings = function(tracking_settings) {
    this.tracking_settings = tracking_settings;
  };

  this.getTrackingSettings = function() {
    return this.tracking_settings;
  };

  this.setReplyTo = function(reply_to) {
    this.reply_to = reply_to;
  };

  this.getReplyTo = function() {
    return this.reply_to;
  };

  if (from_email && subject && to_email && content) {
    this.setFrom(from_email);
    var personalization = new Personalization();
    personalization.addTo(to_email);
    this.addPersonalization(personalization);
    this.setSubject(subject);
    this.addContent(content);
  }

  this.toJSON = function() {
    var json = {
      from: this.getFrom(),
      personalizations: this.getPersonalizations(),
      subject: this.getSubject(),
      content: this.getContents(),
      attachments: this.getAttachments(),
      template_id: this.getTemplateId(),
      sections: this.getSections(),
      headers: this.getHeaders(),
      categories: this.getCategories(),
      custom_args: this.getCustomArgs(),
      send_at: this.getSendAt(),
      batch_id: this.getBatchId(),
      asm: this.getAsm(),
      ip_pool_name: this.getIpPoolName(),
      mail_settings: this.getMailSettings(),
      tracking_settings: this.getTrackingSettings(),
      reply_to: this.getReplyTo(),
    };

    return json;
  };

  return this;
}

module.exports = {
  Email: Email,
  Mail: Mail,
  Personalization: Personalization,
  Content: Content,
  Header: Header,
  Substitution: Substitution,
  CustomArgs: CustomArgs,
  Attachment: Attachment,
  Section: Section,
  Category: Category,
  Asm: Asm,
  Bcc: Bcc,
  BypassListManagement: BypassListManagement,
  Footer: Footer,
  SandBoxMode: SandBoxMode,
  SpamCheck: SpamCheck,
  MailSettings: MailSettings,
  ClickTracking: ClickTracking,
  OpenTracking: OpenTracking,
  SubscriptionTracking: SubscriptionTracking,
  Ganalytics: Ganalytics,
  TrackingSettings: TrackingSettings,
};
