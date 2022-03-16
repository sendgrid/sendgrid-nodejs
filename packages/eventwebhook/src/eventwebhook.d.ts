// From starkbank-ecdsa, minimal interface of PublicKey
declare class PublicKey {
  toString(encode?: boolean): string;
  static fromPem(pem: string): PublicKey;
  static fromDer(der: string): PublicKey;
  static fromString(key: string): PublicKey;
}

declare class EventWebhook {
    /**
     *
     * @param {string} publicKey verification key under Mail Settings
     * @return {PublicKey} A public key using the ECDSA algorithm
     */
    convertPublicKeyToECDSA(publicKey: string): PublicKey;

    /**
     *
     * @param {PublicKey} publicKey elliptic curve public key
     * @param {string|Buffer} payload event payload in the request body
     * @param {string} signature value obtained from the 'X-Twilio-Email-Event-Webhook-Signature' header
     * @param {string} timestamp value obtained from the 'X-Twilio-Email-Event-Webhook-Timestamp' header
     * @return {Boolean} true or false if signature is valid
     */
    verifySignature(publicKey: PublicKey, payload: string|Buffer, signature: string, timestamp: string): boolean;
}

/*
 * This class lists headers that get posted to the webhook. Read the docs for
 * more details: https://sendgrid.com/docs/for-developers/tracking-events/event
 */
declare class EventWebhookHeader {
    static SIGNATURE(): string;
    static TIMESTAMP(): string
}

export {
    EventWebhook,
    EventWebhookHeader,
};
