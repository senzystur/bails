"use strict";
const nodeCrypto = require('crypto');
const { generateKeyPair } = require('libsignal/src/curve.js');
function generateSenderKey() {
    return nodeCrypto.randomBytes(32);
}
exports.generateSenderKey = generateSenderKey;
function generateSenderKeyId() {
    return nodeCrypto.randomInt(2147483647);
}
exports.generateSenderKeyId = generateSenderKeyId;
function generateSenderSigningKey(key) {
    if (!key) {
        key = generateKeyPair();
    }
    return {
        public: Buffer.from(key.pubKey),
        private: Buffer.from(key.privKey)
    };
}
exports.generateSenderSigningKey = generateSenderSigningKey;