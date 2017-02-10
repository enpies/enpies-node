var Resource = require('../Resource');

module.exports = Resource.extend({
    pathSend: '/email/send',
    pathResponses: '/email/responses',

    send: function(params, callback) {
    	this.client.post(this.pathSend, params, callback, function(err, result)  {
    		callback(err, result)
        });
    },

    responses: function(params, callback) {

    	params.email = encodeURIComponent(params.email);

    	this.client.get(this.pathResponses, params, callback, function(err, result)  {
    		callback(err, result)
        });
    }
    
});