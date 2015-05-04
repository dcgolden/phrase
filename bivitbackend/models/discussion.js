var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discussionSchema = new Schema({
	userID : { type: Schema.ObjectId, ref: 'User' },
	startIDX : {type: Number, min : 0},
	endIDX : {type : Number, min : 1},
	content : String,
	comments : [{type: Schema.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Discussion', discussionSchema);
