var mongoose = require('mongoose');

module.exports = mongoose.model('User' , {
	sid: String,
	username: String,
	password: String,
	email: String
});
