function constructError(name) {

    var EnpiesErrors = function(message) {
        this.type = name;
        this.message = message;
    };

    EnpiesErrors.prototype = new Error();
    EnpiesErrors.prototype.constructor = EnpiesErrors;

    return EnpiesErrors;
}

var errors = {
    '401': constructError('AuthenticationError'),
    '406': constructError('UnsupportedFormatRequestedError'),
    '422': constructError('ResourceValidationError'),
    '500': constructError('GeneralAPIError'),
    '503': constructError('ServiceUnavailableError'),
    'client': constructError('GeneralClientError')
};

module.exports = function(status, message) {
    var Constructor = errors[status] || errors['500'];
    return new Constructor(message);
};