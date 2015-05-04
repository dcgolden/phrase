var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = new Schema({
    email        : String,
    password     : String,
    name 		 : String,
	teacherOf      : [{ type: Schema.ObjectId, ref: 'Classroom' }], //classrooms user is admin of
	bio          : String,
	classroomIds : [{ type: Schema.ObjectId, ref: 'Classroom' }],  //classrooms user is allowed into
	//discussionIds : [{ type: Schema.ObjectId, ref: 'Discussion' }], //discussions the user started
	//commentIds : [{ type: Schema.ObjectId, ref: 'Comment' }] //comments the user made
});

// methods ======================
// generating a hash
/*userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};*/

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);