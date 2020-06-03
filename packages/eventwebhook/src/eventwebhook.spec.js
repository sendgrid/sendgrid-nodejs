const EventWebhook = require('./eventwebhook');

describe('EventWebhook', () => {
  const PUBLIC_KEY = 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEDr2LjtURuePQzplybdC+u4CwrqDqBaWjcMMsTbhdbcwHBcepxo7yAQGhHPTnlvFYPAZFceEu/1FwCM/QmGUhA==';
  const SIGNATURE = 'MEUCIQCtIHJeH93Y+qpYeWrySphQgpNGNr/U+UyUlBkU6n7RAwIgJTz2C+8a8xonZGi6BpSzoQsbVRamr2nlxFDWYNH2j/0=';
  const TIMESTAMP = '1588788367';
  const PAYLOAD = {
    event: 'test_event',
    category: 'example_payload',
    message_id: 'message_id',
  };

  describe('#verifySignature()', () => {
    it('should verify a valid signature', () => {
      expect(verify(
        PUBLIC_KEY,
        PAYLOAD,
        SIGNATURE,
        TIMESTAMP
      )).to.be.true;
    });

    it('should reject for invalid key', () => {
      expect(verify(
        'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEqTxd43gyp8IOEto2LdIfjRQrIbsd4SXZkLW6jDutdhXSJCWHw8REntlo7aNDthvj+y7GjUuFDb/R1NGe1OPzpA==',
        PAYLOAD,
        SIGNATURE,
        TIMESTAMP
      )).to.be.false;
    });

    it('should reject for bad payload', () => {
      expect(verify(
        PUBLIC_KEY,
        'payload',
        SIGNATURE,
        TIMESTAMP
      )).to.be.false;
    });

    it('should reject for bad signature', () => {
      expect(verify(
        PUBLIC_KEY,
        PAYLOAD,
        'MEUCIQCtIHJeH93Y+qpYeWrySphQgpNGNr/U+UyUlBkU6n7RAwIgJTz2C+8a8xonZGi6BpSzoQsbVRamr2nlxFDWYNH3j/0=',
        TIMESTAMP
      )).to.be.false;
    });

    it('should reject for bad timestamp', () => {
      expect(verify(
        PUBLIC_KEY,
        PAYLOAD,
        SIGNATURE,
        'timestamp'
      )).to.be.false;
    });
  });
});

function verify(publicKey, payload, signature, timestamp) {
  const ew = new EventWebhook();
  const key = ew.convertPublicKeyToECDSA(publicKey);
  return ew.verifySignature(key, payload, signature, timestamp);
}
