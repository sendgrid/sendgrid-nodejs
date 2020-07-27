import {PublicKey} from "@starkbank/ecdsa";

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

export = EventWebhook;
