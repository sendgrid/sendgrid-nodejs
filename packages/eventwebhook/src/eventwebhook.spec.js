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

  describe('#verifySignature()', () => {
    it('should verify a valid signature', () => {
      expect(verify(
        PUBLIC_KEY,
        PAYLOAD,
        SIGNATURE,
        TIMESTAMP
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
