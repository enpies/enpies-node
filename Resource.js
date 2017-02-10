var extend = require('./utils/extend');
var merge  = require('./utils/merge');

function Resource(client) {
    this.client = client;
    this.schema = {};
}

Resource.extend = extend;

merge(Resource.prototype, {
    path: '',

    materialize: function(attributes) {
        var Constructor  = this.constructor;
        var materialized = new Constructor(this.client);

        for (var key in attributes) {
            materialized[key] = attributes[key];
            materialized.schema[key] = true;
        }

        return materialized;
    },

    toJSON: function() {
        var attributes = {};

        for (var key in this.schema) {
            attributes[key] = this[key];
        }

        return attributes;
    }

});

module.exports = Resource;