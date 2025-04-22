const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    tasks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Task"
    }

})

const model = mongoose.model('User',userSchema);

module.exports = model;