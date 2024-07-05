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


let scoreSchema = mongoose.Schema(
    {
    Username: {type: String, required: true},
    Course: {type: String, required: true},
    Score: {type: String , required: true}
    }
);

let Score = mongoose.model('Score', scoreSchema);
let User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.Score = Score;
