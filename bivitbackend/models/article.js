var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	classroomID : { type: Schema.ObjectId, ref: 'Classroom' },
	title : String,
	author : String,
	source : String,
	content : String,
	discussions : [{type: Schema.ObjectId, ref: 'Discussion'}]
});





module.exports = mongoose.model('Article', articleSchema);

