const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description: String,
    completed: {
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const model = mongoose.model('Task',taskSchema);

module.exports = model;