import EventWebhook = require('@sendgrid/eventwebhook');

var ew = new EventWebhook();
const PUBLIC_KEY = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEDr2LjtURuePQzplybdC+u4CwrqDqBaWjcMMsTbhdbcwHBcepxo7yAQGhHPTnlvFYPAZFceEu/1FwCM/QmGUhA==";
const SIGNATURE = "MEUCIQCtIHJeH93Y+qpYeWrySphQgpNGNr/U+UyUlBkU6n7RAwIgJTz2C+8a8xonZGi6BpSzoQsbVRamr2nlxFDWYNH2j/0=";
const TIMESTAMP = "1588788367";
const PAYLOAD = {
    event: 'test_event',
    category: 'example_payload',
    message_id: 'message_id',
};
var key = ew.convertPublicKeyToECDSA(PUBLIC_KEY);
console.log(ew.verifySignature(key, PAYLOAD, SIGNATURE, TIMESTAMP));
