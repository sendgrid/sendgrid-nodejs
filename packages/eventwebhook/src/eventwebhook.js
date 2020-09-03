'use strict';

const ecdsa = require('starkbank-ecdsa');
const Ecdsa = ecdsa.Ecdsa;
const Signature = ecdsa.Signature;
const PublicKey = ecdsa.PublicKey;

/*
 * This class allows you to use the Event Webhook feature. Read the docs for
 * more details: https://sendgrid.com/docs/for-developers/tracking-events/event
 */
class EventWebhook {
  /**
   * Convert the public key string to a ECPublicKey.
   *
   * @param {string} publicKey verification key under Mail Settings
   * @return {PublicKey} A public key using the ECDSA algorithm
   */
  convertPublicKeyToECDSA(publicKey) {
    return PublicKey.fromPem(publicKey);
  }

  /**
   * Verify signed event webhook requests.
   *
   * @param {PublicKey} publicKey elliptic curve public key
   * @param {string|Buffer} payload event payload in the request body
   * @param {string} signature value obtained from the 'X-Twilio-Email-Event-Webhook-Signature' header
   * @param {string} timestamp value obtained from the 'X-Twilio-Email-Event-Webhook-Timestamp' header
   * @return {Boolean} true or false if signature is valid
   */
  verifySignature(publicKey, payload, signature, timestamp) {
    let timestampPayload = Buffer.isBuffer(payload) ? payload.toString() : payload;
    timestampPayload = timestamp + timestampPayload;
    const decodedSignature = Signature.fromBase64(signature);

    return Ecdsa.verify(timestampPayload, decodedSignature, publicKey);
  }
}

/*
 * This class lists headers that get posted to the webhook. Read the docs for
 * more details: https://sendgrid.com/docs/for-developers/tracking-events/event
 */
class EventWebhookHeader {
  static SIGNATURE() {
    return 'X-Twilio-Email-Event-Webhook-Signature';
  }

  static TIMESTAMP() {
    return 'X-Twilio-Email-Event-Webhook-Timestamp';
  }
}

module.exports = {
  EventWebhook,
  EventWebhookHeader,
};
