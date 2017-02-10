var request = require('request');
var merge = require('./utils/merge');
var query = require('./utils/queryparams');
var serializer = require('./serializer');
var errors = require('./Errors');

var Client = function(config, resources) {
    this.uri = config.uri;
    this.base = config.base;
    this.headers = config.headers || {};
    this.resources = resources || {};
};

merge(Client.prototype, {

    get: function(path, params, callback) {
        var fullPath = this._createPathWithQueryString(path, params);
        var options  = this._createOptions(fullPath, null, 'GET');
        this._sendRequest(options, null, callback);
    },

    post: function(path, data, callback) {
        var options = this._createOptions(path, data, 'POST');
        this._sendRequest(options, data, callback);
    },

    put: function(path, data, callback) {
        var options = this._createOptions(path, data, 'POST');
        this._sendRequest(options, data, callback);
    },

    delete: function(path, data, callback) {
        var options = this._createOptions(path, data, 'POST');
        this._sendRequest(options, data, callback);
    },

    _sendRequest: function(options, data, callback) {
        var resources = this.resources;
        console.log(options)

        request(options, function (error, response, body) {

            if(error) {
                return callback(error)
            }

            var result = {
                status: response.statusCode.toString()
            };

            if (result.status == 200) {
                result.body = serializer.load(body, resources);
                return callback(null, result.body)
            } else {
                return callback(errors(result.status, body))
            }

        }).on('error', function(err) {
            return callback(err)
        });

    },

    _createOptions: function(path, data, method) {

        var url = [this.uri, this.base, path].join("");

        var options = {
            url: url,
            method: method,
            headers: this.headers
        };

        if(typeof data === "object" && data !== null) {
            options.body = serializer.dump(data);
        }

        return options;
    },

    _createPathWithQueryString: function(path, params) {
        return params ? path + '?' + query.stringify(params) : path;
    },

});

module.exports = Client;