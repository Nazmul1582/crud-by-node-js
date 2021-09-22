const mongoose = require("mongoose");
const {Schema} = mongoose;

const studentSchema = new Schema({
    name: String,
    age : Number,
    height: String,
    class:{
        type:String
    },
    section: String,
    email:{
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    password: String,
    isDeleted:{
        type: String,
        default: false
    }
});


module.exports = mongoose.model("student", studentSchema);
