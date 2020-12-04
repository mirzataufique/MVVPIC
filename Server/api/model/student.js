const  mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    std_name: String,
    std_father: String,
    std_mother: String,
    std_dob: String,
    std_address: String,
    std_mobile: Number,
    std_department:String,
    std_email:String
});
module.exports = mongoose.model('Student',studentSchema);