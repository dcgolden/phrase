var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classroomSchema = new Schema({
	classroomName : String,
	articles : [{ type: Schema.ObjectId, ref: 'Article' }]
});

module.exports = mongoose.model('Classroom', classroomSchema);