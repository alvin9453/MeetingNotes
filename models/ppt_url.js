var mongoose = require('mongoose');

module.exports = mongoose.model('PPTURLs' , {
	id: String,
	ppt_title: String,
	url: String
});
