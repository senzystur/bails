"use strict";
const { proto } = require('../../WAProto/index.js');
// NOTE: makeLibSignalRepository dipindahkan ke lazy-load di DEFAULT_CONNECTION_CONFIG
// untuk memutus circular dependency: Defaults -> libsignal -> Utils -> noise-handler -> Defaults
const { Browsers } = require('../Utils/browser-utils.js');
const logger = require('../Utils/logger.js').default || require('../Utils/logger.js');
const version = [2, 3000, 1035194821];
const UNAUTHORIZED_CODES = [401, 403, 419];
exports.UNAUTHORIZED_CODES = UNAUTHORIZED_CODES;
const DEFAULT_ORIGIN = 'https://web.whatsapp.com';
exports.DEFAULT_ORIGIN = DEFAULT_ORIGIN;
const CALL_VIDEO_PREFIX = 'https://call.whatsapp.com/video/';
exports.CALL_VIDEO_PREFIX = CALL_VIDEO_PREFIX;
const CALL_AUDIO_PREFIX = 'https://call.whatsapp.com/voice/';
exports.CALL_AUDIO_PREFIX = CALL_AUDIO_PREFIX;
const DEF_CALLBACK_PREFIX = 'CB:';
exports.DEF_CALLBACK_PREFIX = DEF_CALLBACK_PREFIX;
const DEF_TAG_PREFIX = 'TAG:';
exports.DEF_TAG_PREFIX = DEF_TAG_PREFIX;
const PHONE_CONNECTION_CB = 'CB:Pong';
exports.PHONE_CONNECTION_CB = PHONE_CONNECTION_CB;
const WA_ADV_ACCOUNT_SIG_PREFIX = Buffer.from([6, 0]);
exports.WA_ADV_ACCOUNT_SIG_PREFIX = WA_ADV_ACCOUNT_SIG_PREFIX;
const WA_ADV_DEVICE_SIG_PREFIX = Buffer.from([6, 1]);
exports.WA_ADV_DEVICE_SIG_PREFIX = WA_ADV_DEVICE_SIG_PREFIX;
const WA_ADV_HOSTED_ACCOUNT_SIG_PREFIX = Buffer.from([6, 5]);
exports.WA_ADV_HOSTED_ACCOUNT_SIG_PREFIX = WA_ADV_HOSTED_ACCOUNT_SIG_PREFIX;
const WA_ADV_HOSTED_DEVICE_SIG_PREFIX = Buffer.from([6, 6]);
exports.WA_ADV_HOSTED_DEVICE_SIG_PREFIX = WA_ADV_HOSTED_DEVICE_SIG_PREFIX;
const WA_DEFAULT_EPHEMERAL = 7 * 24 * 60 * 60;
exports.WA_DEFAULT_EPHEMERAL = WA_DEFAULT_EPHEMERAL;
const STATUS_EXPIRY_SECONDS = 24 * 60 * 60;
exports.STATUS_EXPIRY_SECONDS = STATUS_EXPIRY_SECONDS;
const PLACEHOLDER_MAX_AGE_SECONDS = 14 * 24 * 60 * 60;
exports.PLACEHOLDER_MAX_AGE_SECONDS = PLACEHOLDER_MAX_AGE_SECONDS;
const NOISE_MODE = 'Noise_XX_25519_AESGCM_SHA256\0\0\0\0';
exports.NOISE_MODE = NOISE_MODE;
const DICT_VERSION = 3;
exports.DICT_VERSION = DICT_VERSION;
const KEY_BUNDLE_TYPE = Buffer.from([5]);
exports.KEY_BUNDLE_TYPE = KEY_BUNDLE_TYPE;
const NOISE_WA_HEADER = Buffer.from([87, 65, 6, DICT_VERSION]);
exports.NOISE_WA_HEADER = NOISE_WA_HEADER;
const URL_REGEX = /https:\/\/(?![^:@\/\s]+:[^:@\/\s]+@)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?/g;
exports.URL_REGEX = URL_REGEX;
const WA_CERT_DETAILS = {
    SERIAL: 0,
    ISSUER: 'WhatsAppLongTerm1',
    PUBLIC_KEY: Buffer.from('142375574d0a587166aae71ebe516437c4a28b73e3695c6ce1f7f9545da8ee6b', 'hex')
};
exports.WA_CERT_DETAILS = WA_CERT_DETAILS;
const PROCESSABLE_HISTORY_TYPES = [
    proto.HistorySync.HistorySyncType.INITIAL_BOOTSTRAP,
    proto.HistorySync.HistorySyncType.PUSH_NAME,
    proto.HistorySync.HistorySyncType.RECENT,
    proto.HistorySync.HistorySyncType.FULL,
    proto.HistorySync.HistorySyncType.ON_DEMAND,
    proto.HistorySync.HistorySyncType.NON_BLOCKING_DATA,
    proto.HistorySync.HistorySyncType.INITIAL_STATUS_V3
];
exports.PROCESSABLE_HISTORY_TYPES = PROCESSABLE_HISTORY_TYPES;
const DEFAULT_CACHE_TTLS = {
    SIGNAL_STORE: 5 * 60,
    MSG_RETRY: 60 * 60,
    CALL_OFFER: 5 * 60,
    USER_DEVICES: 5 * 60
};
exports.DEFAULT_CACHE_TTLS = DEFAULT_CACHE_TTLS;
const DEFAULT_CONNECTION_CONFIG = {
    version: version,
    browser: Browsers.macOS('Chrome'),
    waWebSocketUrl: 'wss://web.whatsapp.com/ws/chat',
    connectTimeoutMs: 20000,
    keepAliveIntervalMs: 30000,
    logger: logger.child({ class: 'baileys' }),
    emitOwnEvents: true,
    defaultQueryTimeoutMs: 60000,
    customUploadHosts: [],
    retryRequestDelayMs: 250,
    maxMsgRetryCount: 5,
    fireInitQueries: true,
    auth: undefined,
    markOnlineOnConnect: true,
    aiLabel: true,
    syncFullHistory: true,
    patchMessageBeforeSending: msg => msg,
    shouldSyncHistoryMessage: ({ syncType }) => {
        return syncType !== proto.HistorySync.HistorySyncType.FULL;
    },
    shouldIgnoreJid: () => false,
    linkPreviewImageThumbnailWidth: 192,
    transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
    generateHighQualityLinkPreview: false,
    enableAutoSessionRecreation: true,
    enableRecentMessageCache: true,
    options: {},
    appStateMacVerification: {
        patch: false,
        snapshot: false
    },
    countryCode: 'US',
    getMessage: async () => undefined,
    cachedGroupMetadata: async () => undefined,
    // Lazy-load untuk hindari circular dependency
    get makeSignalRepository() {
        return require('../Signal/libsignal.js').makeLibSignalRepository;
    }
};
exports.DEFAULT_CONNECTION_CONFIG = DEFAULT_CONNECTION_CONFIG;
const MEDIA_PATH_MAP = {
    image: '/mms/image',
    video: '/mms/video',
    document: '/mms/document',
    audio: '/mms/audio',
    sticker: '/mms/image',
    'thumbnail-link': '/mms/image',
    'product-catalog-image': '/product/image',
    'md-app-state': '',
    'md-msg-hist': '/mms/md-app-state',
    'biz-cover-photo': '/pps/biz-cover-photo'
};
exports.MEDIA_PATH_MAP = MEDIA_PATH_MAP;
const MEDIA_HKDF_KEY_MAPPING = {
    audio: 'Audio',
    document: 'Document',
    gif: 'Video',
    image: 'Image',
    ppic: '',
    product: 'Image',
    ptt: 'Audio',
    sticker: 'Image',
    video: 'Video',
    'thumbnail-document': 'Document Thumbnail',
    'thumbnail-image': 'Image Thumbnail',
    'thumbnail-video': 'Video Thumbnail',
    'thumbnail-link': 'Link Thumbnail',
    'md-msg-hist': 'History',
    'md-app-state': 'App State',
    'product-catalog-image': '',
    'payment-bg-image': 'Payment Background',
    ptv: 'Video',
    'biz-cover-photo': 'Image'
};
exports.MEDIA_HKDF_KEY_MAPPING = MEDIA_HKDF_KEY_MAPPING;
const MEDIA_KEYS = Object.keys(MEDIA_PATH_MAP);
exports.MEDIA_KEYS = MEDIA_KEYS;
const HISTORY_SYNC_PAUSED_TIMEOUT_MS = 120000;
exports.HISTORY_SYNC_PAUSED_TIMEOUT_MS = HISTORY_SYNC_PAUSED_TIMEOUT_MS;
const MIN_PREKEY_COUNT = 5;
exports.MIN_PREKEY_COUNT = MIN_PREKEY_COUNT;
const INITIAL_PREKEY_COUNT = 812;
exports.INITIAL_PREKEY_COUNT = INITIAL_PREKEY_COUNT;
const UPLOAD_TIMEOUT = 30000;
exports.UPLOAD_TIMEOUT = UPLOAD_TIMEOUT;
const TimeMs = {
    Minute: 60 * 1000,
    Hour: 60 * 60 * 1000,
    Day: 24 * 60 * 60 * 1000,
    Week: 7 * 24 * 60 * 60 * 1000
};
exports.TimeMs = TimeMs;