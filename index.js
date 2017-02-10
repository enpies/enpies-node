'use strict';

var merge  = require('./utils/merge');
var Client = require('./Client');

var VERSION = '1.0.0';
var DEFAULT_URI = 'https://enpies.com';
var DEFAULT_BASE = '/api/v1';
var DEFAULT_PUBLIC_KEY = "PUBLICKEY";
var DEFAULT_SECRET_KEY = "SECRETKEY";
var DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

var resources = {
    'email': require('./resources/Email'),
    'score': require('./resources/Score')
};

function Enpies(config) {

    if (!(this instanceof Enpies)) {
        return new Enpies(config, options);
    }

    if (typeof config === 'undefined') {
        config = {
            uri: null,
            publicKey: null,
            secretKey: null
        }
    }

    this.config = {
        uri: config.uri || DEFAULT_URI,
        base: config.base || DEFAULT_BASE,
        publicKey: config.publicKey || DEFAULT_PUBLIC_KEY,
        secretKey: config.secretKey || DEFAULT_SECRET_KEY,
        headers: config.headers || DEFAULT_HEADERS
    };

    this._validateEnpiesOptions(this.config)

    this._injectAuthHeaders(this.config, this.config.headers)
    this._injectUserAgent(this.config.headers)
    this._initResources();

}

merge(Enpies.prototype, {

    VERSION: VERSION,

    _validateEnpiesOptions: function (config) {
        if (typeof config['uri'] === 'undefined' || config['uri'] === '') throw new TypeError('uri cannot be empty');
        if (typeof config['publicKey'] === 'undefined' || config['publicKey'] === '') throw new TypeError('publicKey cannot be empty');
        if (typeof config['secretKey'] === 'undefined' || config['secretKey'] === '') throw new TypeError('secretKey cannot be empty');
    },

    _injectUserAgent: function(headers) {
        headers['User-Agent'] = 'Enpies Node Client ' + VERSION;
    },

    _injectAuthHeaders: function(config, headers) {
        headers["X-Api-Public-Key"] = config.publicKey;
        headers["X-Api-Secret-Key"] = config.secretKey;
    },

    _initResources : function() {
        var instances = {};
        var client = new Client(this.config, instances);

        for (var name in resources) {
            var Constructor = resources[name];
            this[name] = new Constructor(client);
            instances[name] = this[name];
        }
    }

});

module.exports = Enpies;