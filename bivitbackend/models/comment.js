var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	userID : { type: Schema.ObjectId, ref: 'User' },
	content : String
});

module.exports = mongoose.model('Comment', commentSchema);
