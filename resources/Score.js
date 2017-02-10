var Resource = require('../Resource');

module.exports = Resource.extend({
    pathDetails: '/score/details',

    details: function(params, callback) {

    	this.client.get(this.pathDetails, params, callback, function(err, result)  {
    		callback(err, result)
        });
        
    }
    
});