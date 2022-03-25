const {EventWebhook, EventWebhookHeader} = require('./eventwebhook');

describe('EventWebhook', () => {
  const PUBLIC_KEY = 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE83T4O/n84iotIvIW4mdBgQ/7dAfSmpqIM8kF9mN1flpVKS3GRqe62gw+2fNNRaINXvVpiglSI8eNEc6wEA3F+g==';
  const SIGNATURE = 'MEUCIGHQVtGj+Y3LkG9fLcxf3qfI10QysgDWmMOVmxG0u6ZUAiEAyBiXDWzM+uOe5W0JuG+luQAbPIqHh89M15TluLtEZtM=';
  const TIMESTAMP = '1600112502';
  const PAYLOAD = JSON.stringify(
    [
      {
        email: 'hello@world.com',
        event: 'dropped',
        reason: 'Bounced Address',
        sg_event_id: 'ZHJvcC0xMDk5NDkxOS1MUnpYbF9OSFN0T0doUTRrb2ZTbV9BLTA',
        sg_message_id: 'LRzXl_NHStOGhQ4kofSm_A.filterdrecv-p3mdw1-756b745b58-kmzbl-18-5F5FC76C-9.0',
        'smtp-id': '<LRzXl_NHStOGhQ4kofSm_A@ismtpd0039p1iad1.sendgrid.net>',
        timestamp: 1600112492,
      },
    ]
  ) + '\r\n'; // Be sure to include the trailing carriage return and newline!

  const PUBLIC_KEY_MULTIPLE = 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQ4LIFtWztlsF7skFqOncjD1lun4H5w8XOhyOArHW9RcIx/FfEzx6cikC/yPfUvwaX/JScE7Fc9CJD2afQ9Ok3Q==';
  const SIGNATURE_MULTIPLE = 'MEYCIQC/I4o6vCgqRYrTljjoVWB/GRWNtxeePlLMHr3x9ETeRQIhAIpV+03nREPTTHWSW0wIOA0EoMPdcNgXa70yCaqDJlu5';
  const TIMESTAMP_MULTIPLE = 1619651159;
  const eventsPayloadMultiple = [
    {
      email: 'invalid@gmail.com',
      event: 'processed',
      send_at: 0,
      sg_event_id: 'cHJvY2Vzc2VkLTE5OTQyMTEyLXFOd0JMZ1BRUWpXNkRKdktRd1NBYnctMA',
      sg_message_id: 'qNwBLgPQQjW6DJvKQwSAbw.filterdrecv-canary-547b64655b-cw6zx-1-6089EA4A-56.0',
      'smtp-id': '<qNwBLgPQQjW6DJvKQwSAbw@ismtpd0178p1mdw1.sendgrid.net>',
      timestamp: 1619651146,
    },
    {
      email: 'invalid@gmail.com',
      event: 'bounce',
      ip: '167.89.101.76',
      reason: '552 5.2.2 The email account that you tried to reach is over quota and inactive. Please direct the recipient to https://support.google.com/mail/?p=OverQuotaPerm c17si1130468pgv.34 - gsmtp',
      sg_event_id: 'Ym91bmNlLTAtMTk5NDIxMTItcU53QkxnUFFRalc2REp2S1F3U0Fidy0w',
      sg_message_id: 'qNwBLgPQQjW6DJvKQwSAbw.filterdrecv-canary-547b64655b-cw6zx-1-6089EA4A-56.0',
      'smtp-id': '<qNwBLgPQQjW6DJvKQwSAbw@ismtpd0178p1mdw1.sendgrid.net>',
      status: '5.2.2',
      timestamp: 1619651147,
      tls: 1,
      type: 'blocked',
    },
  ];
  const PAYLOAD_MULTIPLE_EVENTS = JSON.stringify(eventsPayloadMultiple).split('},{').join('},\r\n{') + '\r\n'; // Be sure to include the trailing carriage return and newline after each event


  describe('#verifySignature()', () => {
    it('should verify a valid single event signature', () => {
      expect(verify(
        PUBLIC_KEY,
        PAYLOAD,
        SIGNATURE,
        TIMESTAMP
      )).to.equal(true);
    });

    it('should verify a valid multi event signature', () => {
      expect(verify(
        PUBLIC_KEY_MULTIPLE,
        PAYLOAD_MULTIPLE_EVENTS,
        SIGNATURE_MULTIPLE,
        TIMESTAMP_MULTIPLE
      )).to.equal(true);
    });

    it('should reject for invalid key', () => {
      expect(verify(
        'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEqTxd43gyp8IOEto2LdIfjRQrIbsd4SXZkLW6jDutdhXSJCWHw8REntlo7aNDthvj+y7GjUuFDb/R1NGe1OPzpA==',
        PAYLOAD,
        SIGNATURE,
        TIMESTAMP
      )).to.equal(false);
    });

    it('should reject for bad payload', () => {
      expect(verify(
        PUBLIC_KEY,
        'payload',
        SIGNATURE,
        TIMESTAMP
      )).to.equal(false);
    });

    it('should reject for bad signature', () => {
      expect(verify(
        PUBLIC_KEY,
        PAYLOAD,
        'MEUCIQCtIHJeH93Y+qpYeWrySphQgpNGNr/U+UyUlBkU6n7RAwIgJTz2C+8a8xonZGi6BpSzoQsbVRamr2nlxFDWYNH3j/0=',
        TIMESTAMP
      )).to.equal(false);
    });

    it('should reject for bad timestamp', () => {
      expect(verify(
        PUBLIC_KEY,
        PAYLOAD,
        SIGNATURE,
        'timestamp'
      )).to.equal(false);
    });
  });
});

describe('EventWebhookHeader', () => {
  it('sets the signature header', () => {
    expect(EventWebhookHeader.SIGNATURE()).to.equal('X-Twilio-Email-Event-Webhook-Signature');
  });

  it('sets the timestamp header', () => {
    expect(EventWebhookHeader.TIMESTAMP()).to.equal('X-Twilio-Email-Event-Webhook-Timestamp');
  });
});

function verify(publicKey, payload, signature, timestamp) {
  const ew = new EventWebhook();
  const key = ew.convertPublicKeyToECDSA(publicKey);
  return ew.verifySignature(key, payload, signature, timestamp);
}
