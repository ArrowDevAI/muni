const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');

let userSchema = mongoose.Schema(
    {
        Username: {type: String, required: true},
        Password: {type: String, required: true},
        Email: {type: String, required: true},
        Birthay: Date
});

userSchema.statics.hashPassword = (password)=>{
    return bcrypt.hashSync(password, 10);
};
userSchema.methods.validatePassword = function(password) {
return bcrypt.compareSync(password, this.Password);
};


let scoresSchema = mongoose.Schema(
    {
    Username: {type: String, required: true},
    Course: {type: String, required: true},
    Score: {type: String, required: true},
    Date: {type: Date , default: Date.now}
    }
);
let courseSchema = mongoose.Schema(
    {
    courseName: {type: String, required: true},
    Par: {type: String, required: true},
    }
);

let Score = mongoose.model('Score', scoresSchema);
let User = mongoose.model('User', userSchema);
let Course = mongoose.model('Course', courseSchema);

module.exports.User = User;
module.exports.Score = Score;
module.exports.Course = Course;